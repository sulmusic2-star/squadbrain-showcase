export type MatchOutcome = "win" | "loss" | "draw";

export interface RatingInput {
  playerRating: number;
  opponentRating: number;
  outcome: MatchOutcome;
  kFactor?: number;
}

export interface RatingResult {
  previousRating: number;
  opponentRating: number;
  expectedScore: number;
  actualScore: number;
  delta: number;
  nextRating: number;
}

const OUTCOME_SCORE: Record<MatchOutcome, number> = {
  win: 1,
  draw: 0.5,
  loss: 0,
};

export function expectedScore(playerRating: number, opponentRating: number): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

export function updateRating(input: RatingInput): RatingResult {
  const kFactor = input.kFactor ?? 32;
  const expected = expectedScore(input.playerRating, input.opponentRating);
  const actual = OUTCOME_SCORE[input.outcome];
  const delta = Math.round(kFactor * (actual - expected));

  return {
    previousRating: input.playerRating,
    opponentRating: input.opponentRating,
    expectedScore: Number(expected.toFixed(3)),
    actualScore: actual,
    delta,
    nextRating: input.playerRating + delta,
  };
}

export const exampleResult = updateRating({
  playerRating: 1240,
  opponentRating: 1310,
  outcome: "win",
});
