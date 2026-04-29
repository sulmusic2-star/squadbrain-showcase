import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAchievements, type PlayerStats } from "./achievement-engine.ts";

const baseStats: PlayerStats = {
  roundsPlayed: 0,
  bestAccuracy: 0,
  currentStreak: 0,
  quickMatchWins: 0,
  uniqueTeamsPracticed: 0,
};

test("new players start with locked achievements", () => {
  const achievements = evaluateAchievements(baseStats);

  assert.equal(achievements.every((achievement) => !achievement.unlocked), true);
});

test("achievement rules unlock independently", () => {
  const achievements = evaluateAchievements({
    ...baseStats,
    roundsPlayed: 1,
    bestAccuracy: 0.91,
    quickMatchWins: 3,
  });

  const unlocked = new Set(achievements.filter((achievement) => achievement.unlocked).map((achievement) => achievement.id));

  assert.deepEqual([...unlocked].sort(), ["accuracy-90", "first-round", "quick-match-3"]);
});

test("team breadth and streak achievements use separate stats", () => {
  const achievements = evaluateAchievements({
    ...baseStats,
    currentStreak: 5,
    uniqueTeamsPracticed: 5,
  });

  assert.equal(achievements.find((achievement) => achievement.id === "streak-5")?.unlocked, true);
  assert.equal(achievements.find((achievement) => achievement.id === "five-teams")?.unlocked, true);
  assert.equal(achievements.find((achievement) => achievement.id === "first-round")?.unlocked, false);
});
