<!-- Repo README — github.com/sulmusic2-star/squadbrain-showcase
     Drop-in replacement for the existing README.md
     Upgraded 2026.05 -->

<div align="center">

# SquadBrain

### Sports roster memorization game — mobile, competitive, cross-device

A React Native + Expo + TypeScript + Firebase app built around roster memory, quick-match competition, achievement loops, and ELO-style ranking.

[**Live demo**](https://sulmusic2-star.github.io/squadbrain-showcase/) &nbsp;·&nbsp; [**Evaluator guide**](docs/evaluator-guide.md) &nbsp;·&nbsp; [**Architecture decisions**](docs/adr/README.md)

[![CI](https://img.shields.io/badge/CI-passing-2c5b3a?style=flat-square)](https://github.com/sulmusic2-star/squadbrain-showcase/actions)
[![Tests](https://img.shields.io/badge/tests-25_passing-2c5b3a?style=flat-square)](https://github.com/sulmusic2-star/squadbrain-showcase/actions)
[![Line coverage](https://img.shields.io/badge/line_coverage-98.3%25-2c5b3a?style=flat-square)](docs/coverage-summary.md)
[![Branch coverage](https://img.shields.io/badge/branch_coverage-81.4%25-2c5b3a?style=flat-square)](docs/coverage-summary.md)

</div>

---

## What it does

Most sports trivia games test facts after the fact. **SquadBrain focuses on learning the roster itself** — jersey numbers, players, positions, roster patterns — and turns that knowledge into a repeatable game loop:

- Pick a sport and team
- Memorize the roster
- Play quick rounds to reinforce recall
- Compete through quick-match and leaderboards
- Return through streaks, achievements, rank progression, and friend challenges

---

## What this build shows

- **Mobile product design and iteration** — onboarding, sport/team selection, practice mode, quick match, results + ELO movement, leaderboard, achievements, friend flows, store, legal/privacy screens
- **Expo + React Native + TypeScript** app architecture
- **Zustand** stores with persisted local state — gameplay stays fast instead of waiting on the network
- **Firebase Auth + Firestore + Cloud Functions** for profiles, leaderboards, and validation-sensitive actions
- **ELO-style competitive ranking** + same-team matchmaking + adaptive practice queues
- **Multi-sport roster data modeling**
- **Responsive iPhone + iPad layouts**
- **App Store packaging** — metadata, legal pages, screenshot pack, release-readiness thinking

---

## Technical decisions

- Local state keeps gameplay fast instead of making every tap depend on the network
- Cloud-backed profile, leaderboard, and social records support continuity across devices
- Server-side validation patterns protect competitive results
- Same-team matching keeps comparisons fair
- Achievements, streaks, and rank movement make memorization feel like progression instead of homework

See [`docs/architecture.md`](docs/architecture.md), [`docs/engineering-decisions.md`](docs/engineering-decisions.md), [`docs/adr/README.md`](docs/adr/README.md), [`docs/testing.md`](docs/testing.md), and [`docs/evaluator-guide.md`](docs/evaluator-guide.md).

---

## Code examples

Small TypeScript examples show the product logic behind gameplay, ranking, and achievements:

- [`examples/game-session-state.ts`](examples/game-session-state.ts)
- [`examples/ranking.ts`](examples/ranking.ts)
- [`examples/achievement-engine.ts`](examples/achievement-engine.ts)
- [`examples/roster-normalization.ts`](examples/roster-normalization.ts)
- [`examples/matchmaking.ts`](examples/matchmaking.ts)
- [`examples/adaptive-practice.ts`](examples/adaptive-practice.ts)
- [`examples/result-validation.ts`](examples/result-validation.ts)
- [`docs/coverage-summary.md`](docs/coverage-summary.md)

### Run the examples

```bash
npm ci
npm run ci
```

The CI command type-checks the examples, runs unit tests for ranking, achievements, session state, roster normalization, matchmaking, adaptive practice queues, and result validation, and produces a coverage report.

---

## Reviewer path

1. [Live demo](https://sulmusic2-star.github.io/squadbrain-showcase/)
2. [Case study](docs/case-study.md)
3. [Evaluator guide](docs/evaluator-guide.md)
4. [Architecture decision records](docs/adr/README.md)
5. Advanced logic: [`adaptive-practice.ts`](examples/adaptive-practice.ts) · [`result-validation.ts`](examples/result-validation.ts) · [`matchmaking.ts`](examples/matchmaking.ts)
6. [CI workflow](.github/workflows) · [Coverage summary](docs/coverage-summary.md)

---

[**Portfolio**](https://sulmusic2-star.github.io/) &nbsp;·&nbsp; [hello@lastingground.com](mailto:hello@lastingground.com)
