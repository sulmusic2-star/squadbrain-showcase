import assert from "node:assert/strict";
import test from "node:test";
import { findPromptCandidates, normalizeRoster, normalizeRosterPlayer } from "./roster-normalization.ts";

test("normalizes player names, jersey numbers, and positions", () => {
  const player = normalizeRosterPlayer({ name: "  Josh   Allen ", jersey: "17", position: "qb", teamId: "BUF" });

  assert.deepEqual(player, {
    id: "BUF-josh-allen-17",
    displayName: "Josh Allen",
    jerseyNumber: 17,
    position: "QB",
    teamId: "BUF",
    searchableText: "josh allen qb 17",
  });
});

test("invalid jersey values become null instead of poisoning prompts", () => {
  const player = normalizeRosterPlayer({ name: "Example Player", jersey: "N/A", position: null, teamId: "SAMPLE" });

  assert.equal(player.jerseyNumber, null);
  assert.equal(player.position, "UNK");
  assert.equal(player.id, "SAMPLE-example-player-na");
});

test("normalizing a roster de-duplicates stable player ids", () => {
  const roster = normalizeRoster([
    { id: "player-1", name: "A", jersey: 1, position: "G", teamId: "T" },
    { id: "player-1", name: "A Duplicate", jersey: 1, position: "G", teamId: "T" },
  ]);

  assert.equal(roster.length, 1);
  assert.equal(roster[0]?.displayName, "A");
});

test("prompt candidates can be found by name, position, or jersey", () => {
  const roster = normalizeRoster([
    { name: "Player One", jersey: 10, position: "WR", teamId: "T" },
    { name: "Player Two", jersey: 55, position: "LB", teamId: "T" },
  ]);

  assert.equal(findPromptCandidates(roster, "wr").length, 1);
  assert.equal(findPromptCandidates(roster, "55")[0]?.displayName, "Player Two");
});
