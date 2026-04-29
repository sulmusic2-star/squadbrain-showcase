import assert from "node:assert/strict";
import test from "node:test";
import { validateMatchSubmission, type MatchSubmission } from "./result-validation.ts";

function submission(overrides: Partial<MatchSubmission> = {}): MatchSubmission {
  return {
    sessionId: "session-1",
    userId: "user-1",
    mode: "quick-match",
    startedAtMs: 1_000,
    finishedAtMs: 7_000,
    expectedPromptCount: 3,
    results: [
      { promptId: "p1", expectedPlayerId: "a", selectedPlayerId: "a", isCorrect: true, answeredAtMs: 2_000 },
      { promptId: "p2", expectedPlayerId: "b", selectedPlayerId: "b", isCorrect: true, answeredAtMs: 4_000 },
      { promptId: "p3", expectedPlayerId: "c", selectedPlayerId: "x", isCorrect: false, answeredAtMs: 6_000 },
    ],
    ...overrides,
  };
}

test("valid submissions produce normalized scoring summary", () => {
  const validation = validateMatchSubmission(submission());

  assert.equal(validation.accepted, true);
  assert.equal(validation.riskLevel, "low");
  assert.deepEqual(validation.summary, {
    total: 3,
    correct: 2,
    accuracy: 0.667,
    durationSeconds: 6,
    averageAnswerMs: 2000,
  });
});

test("server recomputes correctness instead of trusting the client", () => {
  const validation = validateMatchSubmission(
    submission({
      results: [{ promptId: "p1", expectedPlayerId: "a", selectedPlayerId: "x", isCorrect: true, answeredAtMs: 2_000 }],
      expectedPromptCount: 1,
      finishedAtMs: 2_000,
    }),
  );

  assert.equal(validation.accepted, false);
  assert.equal(validation.issues[0]?.code, "client-correctness-mismatch");
});

test("duplicate prompts and non-monotonic timestamps are high risk", () => {
  const validation = validateMatchSubmission(
    submission({
      results: [
        { promptId: "p1", expectedPlayerId: "a", selectedPlayerId: "a", isCorrect: true, answeredAtMs: 4_000 },
        { promptId: "p1", expectedPlayerId: "a", selectedPlayerId: "a", isCorrect: true, answeredAtMs: 3_000 },
      ],
      expectedPromptCount: 2,
    }),
  );

  assert.equal(validation.accepted, false);
  assert.deepEqual(validation.issues.map((item) => item.code), ["duplicate-prompt", "non-monotonic-answer-time"]);
});

test("impossibly fast perfect quick matches are held for review", () => {
  const validation = validateMatchSubmission(
    submission({
      finishedAtMs: 2_200,
      results: [
        { promptId: "p1", expectedPlayerId: "a", selectedPlayerId: "a", isCorrect: true, answeredAtMs: 1_300 },
        { promptId: "p2", expectedPlayerId: "b", selectedPlayerId: "b", isCorrect: true, answeredAtMs: 1_700 },
        { promptId: "p3", expectedPlayerId: "c", selectedPlayerId: "c", isCorrect: true, answeredAtMs: 2_100 },
      ],
    }),
  );

  assert.equal(validation.riskLevel, "high");
  assert.equal(validation.issues.at(-1)?.code, "answer-speed-review");
});
