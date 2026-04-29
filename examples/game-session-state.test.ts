import assert from "node:assert/strict";
import test from "node:test";
import { applyGameSessionAction, summarizeSession, type GameSessionState } from "./game-session-state.ts";

function createSession(): GameSessionState {
  return {
    sessionId: "session-1",
    teamId: "BUF",
    mode: "quick-match",
    startedAtMs: 1_000,
    finishedAtMs: null,
    currentPromptIndex: 0,
    results: [],
  };
}

test("answering a prompt advances the session and stores the result", () => {
  const next = applyGameSessionAction(createSession(), {
    type: "answer-prompt",
    result: {
      promptId: "prompt-1",
      expectedPlayerId: "player-1",
      selectedPlayerId: "player-1",
      isCorrect: true,
      answeredAtMs: 2_100,
    },
  });

  assert.equal(next.currentPromptIndex, 1);
  assert.equal(next.results.length, 1);
  assert.equal(next.results[0]?.isCorrect, true);
});

test("skipping a prompt creates an incorrect result", () => {
  const next = applyGameSessionAction(createSession(), {
    type: "skip-prompt",
    promptId: "prompt-2",
    expectedPlayerId: "player-2",
    answeredAtMs: 2_500,
  });

  assert.equal(next.currentPromptIndex, 1);
  assert.equal(next.results[0]?.selectedPlayerId, null);
  assert.equal(next.results[0]?.isCorrect, false);
});

test("session summary calculates score, accuracy, and duration", () => {
  let state = createSession();
  state = applyGameSessionAction(state, {
    type: "answer-prompt",
    result: { promptId: "1", expectedPlayerId: "a", selectedPlayerId: "a", isCorrect: true, answeredAtMs: 2_000 },
  });
  state = applyGameSessionAction(state, {
    type: "answer-prompt",
    result: { promptId: "2", expectedPlayerId: "b", selectedPlayerId: "c", isCorrect: false, answeredAtMs: 4_000 },
  });
  state = applyGameSessionAction(state, { type: "finish-session", finishedAtMs: 6_000 });

  assert.deepEqual(summarizeSession(state), {
    sessionId: "session-1",
    teamId: "BUF",
    mode: "quick-match",
    total: 2,
    correct: 1,
    accuracy: 0.5,
    durationSeconds: 5,
  });
});
