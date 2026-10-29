# Engineering Decisions

## Local session state

The session reducer keeps prompt answers, skips and summaries local, so a round does not need a network round trip for each action.

## Competitive result checks

Competitive results need a trusted answer key and an authenticated session. The public validator checks consistency within the supplied data; its caller supplies both the selected and expected player identifiers. It demonstrates some result checks, but does not establish the server trust boundary of the private application.

## Ranking

The ELO-style helper is a small pure function. That makes it easy to test, tune, and reuse without coupling it to UI screens.

## Achievement rules

Achievements are easier to maintain when unlock logic lives in one rule table instead of being scattered across screens. Adding a new badge should not require rewriting gameplay state.

## Release requirements

A release also needs screenshots, legal screens, app metadata and layouts checked on iPhone and iPad. The release checklist tracks those requirements.

## Roster data

Roster data has to be cleaned before it becomes gameplay. Normalizing names, positions, jersey values, and search text keeps prompt generation predictable.

## Opponent matching

A close rating match is not enough if two players are answering different team prompts. Quick-match ranking starts with same-team context, then uses rating gap and wait time.
