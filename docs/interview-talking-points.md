# Interview / Recruiter Talking Points

Use this if someone asks what the project proves.

## 30-second version

I built SquadBrain as a mobile sports roster memorization game with real product loops: practice, quick match, achievements, leaderboards, friends, and ranking progression. The technical work was mostly around making gameplay fast locally while using Firebase/Cloud Functions for identity, social data, leaderboard state, and validation-sensitive competitive updates.

## What it shows

- I can take an idea from concept to app-store-style product surface.
- I can build in React Native / Expo with TypeScript.
- I understand mobile product loops, not just screens.
- I can separate local UX state from cloud-backed competitive/social state.
- I think about abuse prevention, validation, screenshots, legal screens, and release packaging.
- I know when not to publish secrets or operational internals.

## Best technical answer

The main design decision was splitting the app into a fast local game loop and a cloud-backed competition layer. Practice and memory flow needed to feel instant, while competitive results needed server-side validation patterns before they could affect rankings or leaderboards.

## Best product answer

The core product insight was that sports fans do not just want generic trivia. They want to feel like they know their team. SquadBrain turns roster recall into a repeatable loop with rank, streaks, achievements, and same-team competition.

## What I would improve next

- add a public demo mode with fake/sandbox backend data
- tighten public docs and App Store positioning
- add automated screenshot generation
- improve accessibility and onboarding analytics
- add a more formal test suite around game scoring and rank movement
