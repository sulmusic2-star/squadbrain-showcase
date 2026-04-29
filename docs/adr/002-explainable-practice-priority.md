# ADR-002: Prioritize practice cards with explainable signals

## Context

A memorization product can become random trivia if every prompt is selected randomly. The product needs to feel like practice, not just a quiz stream.

## Decision

Practice cards are prioritized with visible signals: due state, miss count, stability, recent exposure, selected team context, and prompt mix.

## Tradeoff

This requires more state modeling than random selection. The benefit is a practice loop that can explain why a card appears next.

## Consequences

- Weak cards can return at the right time.
- Recently shown cards can be penalized without disappearing.
- Prompt mix can steer learning variety.

## Public proof

- [`examples/adaptive-practice.ts`](../../examples/adaptive-practice.ts)
- [`examples/adaptive-practice.test.ts`](../../examples/adaptive-practice.test.ts)
