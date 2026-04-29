import assert from "node:assert/strict";
import test from "node:test";
import { buildAdaptivePracticeQueue, scorePracticeCard, type PracticeCard } from "./adaptive-practice.ts";

const nowMs = 10 * 60 * 60 * 1000;

function card(overrides: Partial<PracticeCard>): PracticeCard {
  return {
    playerId: "p1",
    teamId: "BUF",
    displayName: "Example Player",
    position: "QB",
    jerseyNumber: 17,
    promptTypes: ["player-to-jersey", "jersey-to-player", "position-recall"],
    correctStreak: 1,
    misses: 0,
    ease: 1,
    lastSeenAtMs: nowMs - 60 * 60 * 1000,
    ...overrides,
  };
}

test("new and missed cards outrank familiar cards", () => {
  const queue = buildAdaptivePracticeQueue(
    [
      card({ playerId: "stable", displayName: "Stable", correctStreak: 5, ease: 2, lastSeenAtMs: nowMs - 60 * 60 * 1000 }),
      card({ playerId: "new", displayName: "New", lastSeenAtMs: null }),
      card({ playerId: "missed", displayName: "Missed", misses: 3, correctStreak: 0 }),
    ],
    { teamId: "BUF", nowMs },
  );

  assert.deepEqual(queue.map((item) => item.card.playerId), ["missed", "new", "stable"]);
  assert.ok(queue[0]?.reasons.includes("miss-history"));
});

test("recently shown cards are penalized without disappearing", () => {
  const item = scorePracticeCard(card({ playerId: "recent", misses: 2 }), {
    teamId: "BUF",
    nowMs,
    recentPlayerIds: ["recent"],
  });

  assert.ok(item.priority < 60);
  assert.ok(item.reasons.includes("recently-shown"));
});

test("queue only uses the selected team and respects limits", () => {
  const queue = buildAdaptivePracticeQueue(
    [
      card({ playerId: "buf-1", teamId: "BUF", displayName: "B" }),
      card({ playerId: "buf-2", teamId: "BUF", displayName: "A" }),
      card({ playerId: "kc-1", teamId: "KC", displayName: "C", lastSeenAtMs: null }),
    ],
    { teamId: "BUF", nowMs, limit: 1 },
  );

  assert.equal(queue.length, 1);
  assert.equal(queue[0]?.card.teamId, "BUF");
});

test("prompt mix can steer the next prompt type", () => {
  const item = scorePracticeCard(card({}), {
    teamId: "BUF",
    nowMs,
    promptMix: { "position-recall": 2 },
  });

  assert.equal(item.promptType, "position-recall");
});
