# Testing

SquadBrain’s public examples have type checks and tests that run in CI.

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

## Limits

The tests cover the selected public modules. They do not establish the behavior or security of the full app and its live services.
