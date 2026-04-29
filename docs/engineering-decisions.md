# Engineering Decisions

## Keep gameplay responsive locally

Roster-memory rounds should feel instant. The session reducer keeps prompt answers, skips, and summaries local so gameplay does not depend on every network round trip.

## Trust competitive results differently than practice results

Practice can be fast and forgiving. Competitive flows need server-side validation patterns so ranking, leaderboards, and match outcomes are not just client claims.

## Keep ranking logic isolated

The ELO-style helper is a small pure function. That makes it easy to test, tune, and reuse without coupling it to UI screens.

## Treat achievements as rules

Achievements are easier to maintain when unlock logic lives in one rule table instead of being scattered across screens. Adding a new badge should not require rewriting gameplay state.

## Design for release, not just the demo

Screenshots, legal screens, app metadata, iPhone/iPad layouts, and release checklists are part of the product surface. The build is stronger when release packaging is treated as engineering work, not cleanup.

## Normalize roster data before prompts

Roster data has to be cleaned before it becomes gameplay. Normalizing names, positions, jersey values, and search text keeps prompt generation predictable.

## Match on context before rating

A close rating match is not enough if two players are answering different team prompts. Quick-match ranking starts with same-team context, then uses rating gap and wait time.
