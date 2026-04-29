# ADR-003: Match players inside the same team context

## Context

A cross-team match can look competitive while testing different knowledge domains. A user answering Buffalo roster prompts should not be compared directly against a user answering Boston roster prompts.

## Decision

Quick-match candidates are filtered into the same team context before rating gap, wait time, and match quality are considered.

## Tradeoff

This can reduce the available match pool. The benefit is fairer comparisons and clearer product logic.

## Consequences

- Same-team context becomes a matchmaking boundary.
- Rating gap is capped to avoid poor matches.
- Wait time can break ties without overriding fairness.

## Public proof

- [`examples/matchmaking.ts`](../../examples/matchmaking.ts)
- [`examples/matchmaking.test.ts`](../../examples/matchmaking.test.ts)
