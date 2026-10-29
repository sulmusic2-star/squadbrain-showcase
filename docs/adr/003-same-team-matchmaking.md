# ADR-003: Match players inside the same team context

## Context

Players answering questions about different teams are being tested on different rosters. A user answering Buffalo roster prompts should not be compared directly against a user answering Boston roster prompts.

## Decision

Quick-match candidates are filtered into the same team context before rating gap, wait time, and match quality are considered.

## Tradeoff

This can reduce the available match pool. Players are compared on the same roster.

## Consequences

- Same-team context becomes a matchmaking boundary.
- Rating gap is capped to avoid poor matches.
- Wait time can break ties without overriding fairness.

## Code and tests

- [`examples/matchmaking.ts`](../../examples/matchmaking.ts)
- [`examples/matchmaking.test.ts`](../../examples/matchmaking.test.ts)
