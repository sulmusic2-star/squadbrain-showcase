# ADR-001: Recompute competitive results before rank movement

## Context

SquadBrain includes competitive quick matches. If the app accepted client-reported scores directly, rank movement could be affected by malformed submissions, duplicated prompts, impossible timing, or mismatched answers.

## Decision

Competitive submissions should be recomputed from prompt IDs, expected answers, submitted answers, and timestamps before rank movement is applied.

## Tradeoff

This adds validation logic and makes the competitive path less simple than a local-only score screen. It lets the system hold suspicious sessions for review before changing ratings.

## Consequences

- The UI can stay fast while the competitive boundary stays stricter.
- Risk flags become part of the product state.
- Rating changes require validated results.

## Code and tests

- [`examples/result-validation.ts`](../../examples/result-validation.ts)
- [`examples/result-validation.test.ts`](../../examples/result-validation.test.ts)
