# ADR-002: Prioritize practice cards with explainable signals

## Context

Random prompt selection can spend time on cards a player already knows while missing cards that need practice.

## Decision

Practice cards are prioritized with visible signals: due state, miss count, stability, recent exposure, selected team context, and prompt mix.

## Tradeoff

This requires more state modeling than random selection. The selection rule can explain why each card appears next.

## Consequences

- Weak cards can return at the right time.
- Recently shown cards can be penalized without disappearing.
- Prompt mix can steer learning variety.

## Code and tests

- [`examples/adaptive-practice.ts`](../../examples/adaptive-practice.ts)
- [`examples/adaptive-practice.test.ts`](../../examples/adaptive-practice.test.ts)
