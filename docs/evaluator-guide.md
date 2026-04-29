# SquadBrain Evaluator Guide

Use this if you are reviewing the repository quickly and want the strongest proof first.

## Thirty-second path

1. Open the live demo: https://sulmusic2-star.github.io/squadbrain-showcase/
2. Inspect the advanced product logic:
   - [`examples/adaptive-practice.ts`](../examples/adaptive-practice.ts)
   - [`examples/result-validation.ts`](../examples/result-validation.ts)
   - [`examples/matchmaking.ts`](../examples/matchmaking.ts)
3. Check the tests and coverage:
   - [`docs/testing.md`](testing.md)
   - [`docs/coverage-summary.md`](coverage-summary.md)
   - [GitHub Actions CI](https://github.com/sulmusic2-star/squadbrain-showcase/actions/workflows/ci.yml)
4. Read the case study: https://sulmusic2-star.github.io/case-studies/squadbrain/

## What this project is meant to prove

- Mobile product thinking: game loop, quick-match flow, achievements, retention loops, responsive app surfaces.
- TypeScript architecture: small typed functions, explicit state transitions, testable product rules.
- Competitive-system judgment: ranking, matchmaking, same-team fairness, result validation, risk flags.
- Product packaging: screenshots, demo GIF, README, docs, tests, CI, coverage, case study.

## Files worth reading

| File | What to look for |
|---|---|
| `examples/adaptive-practice.ts` | Priority scoring, review reasons, prompt mix, recent-exposure penalty. |
| `examples/result-validation.ts` | Server-style recomputation, duplicate prompt detection, non-monotonic timestamp checks, speed review. |
| `examples/matchmaking.ts` | Same-team filter, rating-gap cap, wait-time tie breaker. |
| `examples/game-session-state.ts` | Reducer-style session updates and scoring summary. |
| `docs/engineering-decisions.md` | Product/architecture tradeoffs. |

## Why it is not just a UI demo

The screenshots show the app surface. The examples show the product rules behind the surface: how a session moves, how a match is selected, how practice priority changes, and how competitive results are guarded before rank movement.
