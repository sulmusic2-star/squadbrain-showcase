export interface PlayerStats {
  roundsPlayed: number;
  bestAccuracy: number;
  currentStreak: number;
  quickMatchWins: number;
  uniqueTeamsPracticed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

type AchievementRule = Omit<Achievement, "unlocked"> & {
  isUnlocked(stats: PlayerStats): boolean;
};

const RULES: AchievementRule[] = [
  {
    id: "first-round",
    title: "First Whistle",
    description: "Complete your first roster round.",
    isUnlocked: (stats) => stats.roundsPlayed >= 1,
  },
  {
    id: "accuracy-90",
    title: "Locked In",
    description: "Reach 90% accuracy in a round.",
    isUnlocked: (stats) => stats.bestAccuracy >= 0.9,
  },
  {
    id: "streak-5",
    title: "Hot Streak",
    description: "Build a five-round practice streak.",
    isUnlocked: (stats) => stats.currentStreak >= 5,
  },
  {
    id: "quick-match-3",
    title: "Competitive Memory",
    description: "Win three quick matches.",
    isUnlocked: (stats) => stats.quickMatchWins >= 3,
  },
  {
    id: "five-teams",
    title: "Around the League",
    description: "Practice with five different teams.",
    isUnlocked: (stats) => stats.uniqueTeamsPracticed >= 5,
  },
];

export function evaluateAchievements(stats: PlayerStats): Achievement[] {
  return RULES.map((rule) => ({
    id: rule.id,
    title: rule.title,
    description: rule.description,
    unlocked: rule.isUnlocked(stats),
  }));
}

export const exampleAchievements = evaluateAchievements({
  roundsPlayed: 12,
  bestAccuracy: 0.92,
  currentStreak: 4,
  quickMatchWins: 3,
  uniqueTeamsPracticed: 6,
});
