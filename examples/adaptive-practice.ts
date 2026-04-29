export type PromptType = "jersey-to-player" | "player-to-jersey" | "position-recall";

export interface PracticeCard {
  playerId: string;
  teamId: string;
  displayName: string;
  position: string;
  jerseyNumber: number | null;
  promptTypes: PromptType[];
  correctStreak: number;
  misses: number;
  ease: number;
  lastSeenAtMs: number | null;
}

export interface PracticeQueueOptions {
  teamId: string;
  nowMs: number;
  limit?: number;
  recentPlayerIds?: string[];
  promptMix?: Partial<Record<PromptType, number>>;
}

export interface PracticeQueueItem {
  card: PracticeCard;
  promptType: PromptType;
  priority: number;
  reasons: string[];
}

const ONE_HOUR_MS = 60 * 60 * 1000;
const DEFAULT_MIX: Record<PromptType, number> = {
  "jersey-to-player": 1,
  "player-to-jersey": 0.9,
  "position-recall": 0.72,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function reviewIntervalMs(card: PracticeCard): number {
  const ease = clamp(card.ease || 1, 0.6, 3);
  const streakMultiplier = Math.pow(2, Math.min(card.correctStreak, 6));
  const missPenalty = card.misses > 0 ? 0.55 : 1;
  return ONE_HOUR_MS * ease * streakMultiplier * missPenalty;
}

function choosePromptType(card: PracticeCard, promptMix: Partial<Record<PromptType, number>> = {}): PromptType {
  const weights = { ...DEFAULT_MIX, ...promptMix };
  return [...card.promptTypes].sort((a, b) => (weights[b] ?? 0) - (weights[a] ?? 0))[0] ?? "player-to-jersey";
}

export function scorePracticeCard(card: PracticeCard, options: PracticeQueueOptions): PracticeQueueItem {
  const reasons: string[] = [];
  let priority = 0;

  if (card.lastSeenAtMs === null) {
    priority += 80;
    reasons.push("new-card");
  } else {
    const elapsed = Math.max(0, options.nowMs - card.lastSeenAtMs);
    const dueRatio = elapsed / reviewIntervalMs(card);
    priority += clamp(dueRatio * 55, 0, 95);
    if (dueRatio >= 1) reasons.push("due-for-review");
  }

  if (card.misses > 0) {
    priority += clamp(card.misses * 12, 0, 36);
    reasons.push("miss-history");
  }

  if (card.correctStreak === 0) {
    priority += 10;
    reasons.push("not-yet-stable");
  }

  if ((options.recentPlayerIds ?? []).includes(card.playerId)) {
    priority -= 35;
    reasons.push("recently-shown");
  }

  if (card.jerseyNumber === null && card.promptTypes.includes("jersey-to-player")) {
    priority -= 15;
    reasons.push("missing-jersey");
  }

  return {
    card,
    promptType: choosePromptType(card, options.promptMix),
    priority: Math.round(clamp(priority, 0, 100)),
    reasons,
  };
}

export function buildAdaptivePracticeQueue(
  cards: PracticeCard[],
  options: PracticeQueueOptions,
): PracticeQueueItem[] {
  const limit = options.limit ?? 8;

  return cards
    .filter((card) => card.teamId === options.teamId)
    .map((card) => scorePracticeCard(card, options))
    .sort((a, b) => b.priority - a.priority || b.card.misses - a.card.misses || a.card.displayName.localeCompare(b.card.displayName))
    .slice(0, limit);
}
