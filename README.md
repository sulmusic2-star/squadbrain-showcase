# SquadBrain — Sports Roster Memorization Game

> A mobile sports-learning game built around roster memory, quick-match competition, achievement loops, and cross-device progression.

This is a **public portfolio showcase** for SquadBrain. It is intentionally not a full production source dump. The live/private implementation, credentials, data pipelines, and operational details are kept private.

![SquadBrain demo](assets/squadbrain-demo.gif)

![SquadBrain screenshot contact sheet](screenshots/00-screenshot-contact-sheet.jpg)

Live demo: https://sulmusic2-star.github.io/squadbrain-showcase/

## Why this project exists

Most sports trivia games test facts after the fact. SquadBrain is built around a more specific loop:

1. pick a sport and team
2. memorize jersey numbers, players, positions, and roster patterns
3. play quick rounds to reinforce recall
4. compete through quick match / leaderboard mechanics
5. return through streaks, achievements, rank progression, and friend challenges

The product goal was to make roster knowledge feel like a repeatable game loop, not a static quiz.

## What this showcase demonstrates

- Mobile product design and iteration
- Expo / React Native app architecture
- State management across game, user, progress, achievements, monetization, and matchmaking flows
- Firebase-backed social and leaderboard features
- Cloud Functions for server-side validation and anti-cheat patterns
- ELO-style competitive ranking and quick-match flows
- Multi-sport roster data modeling
- Responsive iPhone/iPad layouts
- App Store packaging, legal screens, and release-readiness thinking
- Security-aware architecture without exposing production secrets

## Product surface

The private app includes surfaces for:

- onboarding and username setup
- sport and team selection
- practice mode
- quick match
- results and ELO movement
- global leaderboard
- achievement badges
- friend flows and challenges
- progress tracking
- store / monetization experiments
- legal / privacy screens

See [`docs/product-walkthrough.md`](docs/product-walkthrough.md).

## Technical architecture

High-level stack:

- **Frontend:** Expo + React Native + TypeScript
- **State:** Zustand stores with persisted local state
- **Backend:** Firebase Auth, Firestore, Cloud Functions
- **Game logic:** local game loop with server-side result validation patterns
- **Competition:** quick-match, ELO movement, leaderboards, achievements
- **Release:** App Store-oriented metadata, legal pages, screenshot pack, mobile/iPad layouts

See [`docs/architecture.md`](docs/architecture.md).

## Security / privacy posture

This public repo intentionally excludes:

- `.env` files
- API keys
- Firebase project secrets
- production Cloud Function source details
- private roster refresh methods
- anti-abuse thresholds beyond high-level descriptions
- operational deployment notes
- app-store credentials

See [`docs/security-and-redaction.md`](docs/security-and-redaction.md).

## Screenshots

| Home / quick match | Competition | Result / ELO |
|---|---|---|
| ![](screenshots/01-squad-brain-1.png) | ![](screenshots/02-real-squad-brain-2.png) | ![](screenshots/03-squad-brain-3.png) |

| Record | Achievements | Leaderboard |
|---|---|---|
| ![](screenshots/04-squad-brain-4.png) | ![](screenshots/05-squad-brain-5.png) | ![](screenshots/06-squad-brain-6.png) |

## What I would talk about in an interview

- How the product loop turns memorization into progression and competition.
- Why same-team matching matters for fair comparison.
- How persisted local state and cloud sync were separated to keep gameplay fast.
- Why result validation should happen server-side for competitive modes.
- How screenshots, legal docs, app metadata, and release checklists were treated as part of the product, not afterthoughts.
- How the public showcase was deliberately redacted before publishing.

## Status

Portfolio showcase. Production internals private.

