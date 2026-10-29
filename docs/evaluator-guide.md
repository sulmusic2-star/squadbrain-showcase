# Reviewing the SquadBrain examples

Start with the practice demo, then inspect its scoring rules and tests.

## Where to start

1. Open the live demo: https://sulmusic2-star.github.io/squadbrain-showcase/
2. Inspect the practice, result-checking and matchmaking code:
   - [`examples/adaptive-practice.ts`](../examples/adaptive-practice.ts)
   - [`examples/result-validation.ts`](../examples/result-validation.ts)
   - [`examples/matchmaking.ts`](../examples/matchmaking.ts)
3. Check the tests and coverage:
   - [`docs/testing.md`](testing.md)
   - [`docs/coverage-summary.md`](coverage-summary.md)
   - [GitHub Actions CI](https://github.com/sulmusic2-star/squadbrain-showcase/actions/workflows/ci.yml)
4. Read the case study: https://sulmusic2-star.github.io/case-studies/squadbrain/

## What the examples cover

The TypeScript modules handle session state, card selection, matchmaking, ranking and result checks. Screenshots show the mobile app; tests and coverage apply to the selected public examples.

## Files worth reading

| File | What to look for |
|---|---|
| `examples/adaptive-practice.ts` | Priority scoring, review reasons, prompt mix, recent-exposure penalty. |
| `examples/result-validation.ts` | Server-style recomputation, duplicate prompt detection, non-monotonic timestamp checks, speed review. |
| `examples/matchmaking.ts` | Same-team filter, rating-gap cap, wait-time tie breaker. |
| `examples/game-session-state.ts` | Reducer-style session updates and scoring summary. |
| `docs/engineering-decisions.md` | Product/architecture tradeoffs. |

## Follow a result

Change a card’s history in the demo, inspect the resulting priority, and compare it with the practice module and tests.
