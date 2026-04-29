# SquadBrain Code Examples

Small TypeScript examples that show the product logic behind the app.

## Files

- [`game-session-state.ts`](game-session-state.ts) — game session reducer and scoring summary
- [`ranking.ts`](ranking.ts) — ELO-style rating update helper
- [`achievement-engine.ts`](achievement-engine.ts) — achievement unlock rules
- [`roster-normalization.ts`](roster-normalization.ts) — roster cleanup and prompt candidate helpers
- [`matchmaking.ts`](matchmaking.ts) — same-team quick-match candidate ranking
- [`adaptive-practice.ts`](adaptive-practice.ts) — spaced-practice queue scoring with review reasons
- [`result-validation.ts`](result-validation.ts) — server-style result validation and risk flags

## What they show

- separating fast local gameplay state from trusted competitive updates
- keeping ranking math isolated and testable
- treating achievements as explicit rules instead of scattered UI flags
- normalizing roster data before it reaches prompts
- ranking match candidates by same-team fit, rating gap, and wait time
- prioritizing practice prompts by due state, misses, recent exposure, and prompt mix
- recomputing competitive submissions before ranking updates
- designing game systems that can evolve without rewriting every screen
