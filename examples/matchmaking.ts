export interface MatchCandidate {
  userId: string;
  teamId: string;
  rating: number;
  queuedAtMs: number;
}

export interface MatchResult {
  candidate: MatchCandidate;
  ratingGap: number;
  waitMs: number;
  score: number;
}

export interface MatchmakingOptions {
  nowMs: number;
  maxRatingGap?: number;
  waitWeight?: number;
}

export function rankMatchCandidates(
  player: MatchCandidate,
  candidates: MatchCandidate[],
  options: MatchmakingOptions,
): MatchResult[] {
  const maxRatingGap = options.maxRatingGap ?? 250;
  const waitWeight = options.waitWeight ?? 0.001;

  return candidates
    .filter((candidate) => candidate.userId !== player.userId)
    .filter((candidate) => candidate.teamId === player.teamId)
    .map((candidate) => {
      const ratingGap = Math.abs(candidate.rating - player.rating);
      const waitMs = Math.max(0, options.nowMs - candidate.queuedAtMs);
      const score = ratingGap - waitMs * waitWeight;
      return { candidate, ratingGap, waitMs, score };
    })
    .filter((result) => result.ratingGap <= maxRatingGap)
    .sort((a, b) => a.score - b.score || a.candidate.queuedAtMs - b.candidate.queuedAtMs);
}

export function pickBestMatch(
  player: MatchCandidate,
  candidates: MatchCandidate[],
  options: MatchmakingOptions,
): MatchCandidate | null {
  return rankMatchCandidates(player, candidates, options)[0]?.candidate ?? null;
}
