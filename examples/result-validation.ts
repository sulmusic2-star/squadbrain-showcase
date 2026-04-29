export type IssueSeverity = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high";

export interface PromptSubmissionResult {
  promptId: string;
  expectedPlayerId: string;
  selectedPlayerId: string | null;
  isCorrect: boolean;
  answeredAtMs: number;
}

export interface MatchSubmission {
  sessionId: string;
  userId: string;
  mode: "practice" | "quick-match";
  startedAtMs: number;
  finishedAtMs: number;
  expectedPromptCount: number;
  results: PromptSubmissionResult[];
}

export interface ValidationIssue {
  code: string;
  severity: IssueSeverity;
  message: string;
}

export interface SubmissionValidation {
  accepted: boolean;
  riskLevel: RiskLevel;
  issues: ValidationIssue[];
  summary: {
    total: number;
    correct: number;
    accuracy: number;
    durationSeconds: number;
    averageAnswerMs: number;
  };
}

export interface ValidationOptions {
  minAverageAnswerMs?: number;
  maxSessionDurationMs?: number;
}

function issue(code: string, severity: IssueSeverity, message: string): ValidationIssue {
  return { code, severity, message };
}

function riskFromIssues(issues: ValidationIssue[]): RiskLevel {
  if (issues.some((item) => item.severity === "high")) return "high";
  if (issues.some((item) => item.severity === "medium")) return "medium";
  return "low";
}

export function validateMatchSubmission(
  submission: MatchSubmission,
  options: ValidationOptions = {},
): SubmissionValidation {
  const minAverageAnswerMs = options.minAverageAnswerMs ?? 650;
  const maxSessionDurationMs = options.maxSessionDurationMs ?? 15 * 60 * 1000;
  const issues: ValidationIssue[] = [];

  if (submission.finishedAtMs <= submission.startedAtMs) {
    issues.push(issue("invalid-duration", "high", "Session finished before it started."));
  }

  if (submission.results.length !== submission.expectedPromptCount) {
    issues.push(issue("prompt-count-mismatch", "high", "Submitted result count does not match expected prompt count."));
  }

  const seenPromptIds = new Set<string>();
  let previousAnsweredAt = submission.startedAtMs;
  for (const result of submission.results) {
    if (seenPromptIds.has(result.promptId)) {
      issues.push(issue("duplicate-prompt", "high", `Prompt ${result.promptId} was submitted more than once.`));
    }
    seenPromptIds.add(result.promptId);

    if (result.answeredAtMs < previousAnsweredAt) {
      issues.push(issue("non-monotonic-answer-time", "high", "Answer timestamps must move forward."));
    }
    previousAnsweredAt = result.answeredAtMs;

    const serverCheck = result.selectedPlayerId === result.expectedPlayerId;
    if (serverCheck !== result.isCorrect) {
      issues.push(issue("client-correctness-mismatch", "high", `Prompt ${result.promptId} correctness did not match server recomputation.`));
    }
  }

  const durationMs = Math.max(0, submission.finishedAtMs - submission.startedAtMs);
  if (durationMs > maxSessionDurationMs) {
    issues.push(issue("session-too-long", "medium", "Session duration is outside the review window."));
  }

  const total = submission.results.length;
  const correct = submission.results.filter((result) => result.selectedPlayerId === result.expectedPlayerId).length;
  const averageAnswerMs = total === 0 ? 0 : Math.round(durationMs / total);
  const accuracy = total === 0 ? 0 : Number((correct / total).toFixed(3));

  if (submission.mode === "quick-match" && total > 0 && averageAnswerMs < minAverageAnswerMs) {
    issues.push(issue("answer-speed-review", accuracy >= 0.9 ? "high" : "medium", "Average answer speed needs review before ranking is updated."));
  }

  const riskLevel = riskFromIssues(issues);

  return {
    accepted: riskLevel !== "high",
    riskLevel,
    issues,
    summary: {
      total,
      correct,
      accuracy,
      durationSeconds: Math.round(durationMs / 1000),
      averageAnswerMs,
    },
  };
}
