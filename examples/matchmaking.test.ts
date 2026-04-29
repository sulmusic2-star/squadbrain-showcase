import assert from "node:assert/strict";
import test from "node:test";
import { pickBestMatch, rankMatchCandidates, type MatchCandidate } from "./matchmaking.ts";

const player: MatchCandidate = {
  userId: "current-user",
  teamId: "BUF",
  rating: 1300,
  queuedAtMs: 10_000,
};

test("matchmaking only compares players in the same team context", () => {
  const candidates: MatchCandidate[] = [
    { userId: "same-team", teamId: "BUF", rating: 1290, queuedAtMs: 9_000 },
    { userId: "wrong-team", teamId: "KC", rating: 1290, queuedAtMs: 1_000 },
  ];

  const ranked = rankMatchCandidates(player, candidates, { nowMs: 11_000 });

  assert.equal(ranked.length, 1);
  assert.equal(ranked[0]?.candidate.userId, "same-team");
});

test("rating gaps are capped to avoid unfair matches", () => {
  const candidates: MatchCandidate[] = [
    { userId: "close", teamId: "BUF", rating: 1350, queuedAtMs: 9_000 },
    { userId: "too-far", teamId: "BUF", rating: 1900, queuedAtMs: 1_000 },
  ];

  const ranked = rankMatchCandidates(player, candidates, { nowMs: 11_000, maxRatingGap: 200 });

  assert.deepEqual(ranked.map((result) => result.candidate.userId), ["close"]);
});

test("wait time can break ties between similarly rated candidates", () => {
  const candidates: MatchCandidate[] = [
    { userId: "newer", teamId: "BUF", rating: 1310, queuedAtMs: 10_500 },
    { userId: "older", teamId: "BUF", rating: 1310, queuedAtMs: 1_000 },
  ];

  const match = pickBestMatch(player, candidates, { nowMs: 11_000 });

  assert.equal(match?.userId, "older");
});

test("returns null when there is no fair same-team match", () => {
  const match = pickBestMatch(
    player,
    [{ userId: "wrong-team", teamId: "KC", rating: 1300, queuedAtMs: 1_000 }],
    { nowMs: 11_000 },
  );

  assert.equal(match, null);
});
