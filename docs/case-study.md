# Case Study — SquadBrain

*A mobile sports-learning game built around roster memory. React Native · Expo · TypeScript · Firebase.*

[📱 App Store](https://apps.apple.com/us/app/squadbrain/id6756122317) · [Live demo](https://sulmusic2-star.github.io/squadbrain-showcase/) · [Architecture](architecture.md) · [ADRs](adr/README.md) · [Coverage](coverage-summary.md)

> SquadBrain is **live on the iOS App Store**; its app source is private. This repo is the extracted, independently-tested product logic — gameplay, ranking, matchmaking, and validation modules — enough to evaluate the engineering.

---

## The idea

Most sports games quiz you on facts after the fact. SquadBrain flips that: the thing you learn *is* the roster — players, numbers, positions, patterns — and the game loop turns that into repeatable recall. Pick a sport and team, memorize the roster, play quick rounds, and come back through streaks, achievements, rank movement, and friend challenges.

## What it demonstrates

- **A complete mobile product**, not a screen: onboarding, sport/team selection, practice, quick-match, results with ELO movement, leaderboards, achievements, friend flows, store, and legal/privacy screens.
- **Expo + React Native + TypeScript** architecture with **Zustand** stores and persisted local state, so gameplay stays fast instead of waiting on the network.
- **Firebase Auth + Firestore + Cloud Functions** for profiles, leaderboards, and validation-sensitive actions, with server-side patterns that protect competitive results.
- **Real competitive systems:** ELO-style ranking, same-team matchmaking for fair comparisons, and adaptive practice queues that target weak spots.
- **Shipped:** SquadBrain is **live on the iOS App Store** ([listing](https://apps.apple.com/us/app/squadbrain/id6756122317)) — metadata, screenshot pack, published legal/privacy/terms pages, and the full submission/review pipeline. The unglamorous work that separates a real app from a prototype.

## The engineering decisions

- Local-first state keeps every tap instant; cloud-backed records give continuity across devices.
- Competitive results are validated server-side, not trusted from the client.
- Progression (streaks, achievements, rank) is designed to make memorization feel like a game instead of homework.

See [`architecture.md`](architecture.md), [`engineering-decisions.md`](engineering-decisions.md), and the [ADRs](adr/README.md) for the reasoning.

## Results

The product logic is extracted into seven typed modules with **25 passing tests at 98.3% line / 81.44% branch coverage in CI** — ranking, achievements, session state, roster normalization, matchmaking, adaptive practice, and result validation — so a reviewer can run and inspect the core logic directly.

---

[Portfolio](https://sulmusic2-star.github.io/) · [hello@lastingground.com](mailto:hello@lastingground.com)
