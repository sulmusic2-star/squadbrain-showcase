# SquadBrain

SquadBrain is a sports roster learning app for iPhone and iPad. The [App Store listing](https://apps.apple.com/us/app/squadbrain/id6756122317) identifies Timothy Sullivan as its developer.

The full application source is private. This repository contains selected TypeScript examples, tests and technical notes.

## Product logic

A roster game needs rules for practice, matching and scoring as well as a usable interface. The public examples make those rules available to inspect:

- [Adaptive practice](../examples/adaptive-practice.ts) calculates practice priority.
- [Matchmaking](../examples/matchmaking.ts) selects opponents using explicit criteria.
- [Result validation](../examples/result-validation.ts) recomputes answer correctness and reports inconsistent submissions.
- [Ranking](../examples/ranking.ts) calculates competitive rating changes.
- [Roster normalization](../examples/roster-normalization.ts) gives roster data a consistent structure.

## Decisions and limits

The [decision records](adr/README.md) explain same-team matching, practice selection and result checks. Keeping these rules separate from the interface makes them easier to test and discuss.

The examples demonstrate particular application rules. Their test results do not validate the full app, its live backend, user adoption or commercial outcomes.

[Run the examples](../README.md#run-locally) · [Architecture](architecture.md)
