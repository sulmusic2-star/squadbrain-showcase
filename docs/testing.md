# Testing

SquadBrain's public examples are small, but they are treated like production logic: typed, tested, and runnable in CI.

## Run locally

```bash
npm ci
npm run ci
npm run coverage
```

## Coverage

A committed coverage snapshot lives at [`docs/coverage-summary.md`](coverage-summary.md). Re-run it with:

```bash
npm run coverage
```

## What is covered

- ELO-style rating updates
- achievement unlock rules
- game-session reducer behavior
- session score/accuracy summaries
- roster normalization
- prompt candidate search
- same-team quick-match candidate ranking
- adaptive practice priority scoring
- server-style result validation and review flags

## Why this matters

A mobile product can look polished while hiding brittle logic. These tests show the core gameplay decisions are expressed as small functions with predictable behavior.
