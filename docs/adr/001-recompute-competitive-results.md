# ADR-001: Recompute competitive results before rank movement

## Context

SquadBrain has competitive quick-match surfaces. If the app accepted client-reported scores directly, rank movement could be affected by malformed submissions, duplicated prompts, impossible timing, or mismatched answers.

## Decision

Competitive submissions should be recomputed from prompt IDs, expected answers, submitted answers, and timestamps before rank movement is applied.

## Tradeoff

This adds validation logic and makes the competitive path less simple than a local-only score screen. The benefit is that ranking can be defended and suspicious sessions can be held for review.

## Consequences

- The UI can stay fast while the competitive boundary stays stricter.
- Risk flags become part of the product state.
- Rank movement is tied to validated results, not just client claims.

## Public proof

- [`examples/result-validation.ts`](../../examples/result-validation.ts)
- [`examples/result-validation.test.ts`](../../examples/result-validation.test.ts)
