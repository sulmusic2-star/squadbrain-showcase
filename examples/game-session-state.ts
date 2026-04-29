export interface PromptResult {
  promptId: string;
  expectedPlayerId: string;
  selectedPlayerId: string | null;
  isCorrect: boolean;
  answeredAtMs: number;
}

export interface GameSessionState {
  sessionId: string;
  teamId: string;
  mode: "practice" | "quick-match";
  startedAtMs: number;
  finishedAtMs: number | null;
  currentPromptIndex: number;
  results: PromptResult[];
}

export type GameSessionAction =
  | { type: "answer-prompt"; result: PromptResult }
  | { type: "skip-prompt"; promptId: string; expectedPlayerId: string; answeredAtMs: number }
  | { type: "finish-session"; finishedAtMs: number };

export function applyGameSessionAction(
  state: GameSessionState,
  action: GameSessionAction,
): GameSessionState {
  switch (action.type) {
    case "answer-prompt":
      return {
        ...state,
        currentPromptIndex: state.currentPromptIndex + 1,
        results: [...state.results, action.result],
      };

    case "skip-prompt":
      return {
        ...state,
        currentPromptIndex: state.currentPromptIndex + 1,
        results: [
          ...state.results,
          {
            promptId: action.promptId,
            expectedPlayerId: action.expectedPlayerId,
            selectedPlayerId: null,
            isCorrect: false,
            answeredAtMs: action.answeredAtMs,
          },
        ],
      };

    case "finish-session":
      return {
        ...state,
        finishedAtMs: action.finishedAtMs,
      };
  }
}

export function summarizeSession(state: GameSessionState) {
  const correct = state.results.filter((result) => result.isCorrect).length;
  const total = state.results.length;
  const durationMs = (state.finishedAtMs ?? Date.now()) - state.startedAtMs;

  return {
    sessionId: state.sessionId,
    teamId: state.teamId,
    mode: state.mode,
    total,
    correct,
    accuracy: total === 0 ? 0 : Number((correct / total).toFixed(3)),
    durationSeconds: Math.round(durationMs / 1000),
  };
}
