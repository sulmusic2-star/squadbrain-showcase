import assert from "node:assert/strict";
import test from "node:test";
import { expectedScore, updateRating } from "./ranking.ts";

test("expectedScore is higher for the favored player", () => {
  const favored = expectedScore(1400, 1200);
  const underdog = expectedScore(1200, 1400);

  assert.ok(favored > 0.75);
  assert.ok(underdog < 0.25);
  assert.equal(Number((favored + underdog).toFixed(3)), 1);
});

test("rating increases after a win and decreases after a loss", () => {
  const win = updateRating({ playerRating: 1240, opponentRating: 1310, outcome: "win" });
  const loss = updateRating({ playerRating: 1240, opponentRating: 1310, outcome: "loss" });

  assert.ok(win.delta > 0);
  assert.ok(win.nextRating > win.previousRating);
  assert.ok(loss.delta < 0);
  assert.ok(loss.nextRating < loss.previousRating);
});

test("draws move ratings toward the expected score", () => {
  const result = updateRating({ playerRating: 1500, opponentRating: 1300, outcome: "draw", kFactor: 24 });

  assert.ok(result.expectedScore > 0.7);
  assert.equal(result.actualScore, 0.5);
  assert.ok(result.delta < 0);
});
