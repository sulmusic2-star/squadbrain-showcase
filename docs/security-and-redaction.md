# Security And Redaction Notes

This repository is designed to show the project without leaking private material.

## Redacted from the public showcase

- production `.env` files
- Firebase keys and project IDs
- API keys for AI providers
- RevenueCat / monetization keys
- app-store credentials
- deployment tokens
- full Cloud Function source
- exact anti-abuse thresholds
- private data refresh scripts
- raw launch notes containing operational details
- generated completion/audit notes that overexplain internal process

## Why not publish the raw repo?

The raw private project contains real production configuration, deployment history, and operational notes. Publishing it directly would make the project look less professional and could leak credentials or reusable methods.

The better public posture is:

1. show the product
2. show the architecture
3. show technical judgment
4. keep the implementation details private

## Public-safe technical claims

Safe to say:

- built with Expo, React Native, TypeScript, Firebase, and Cloud Functions
- includes quick match, ELO-style ranking, leaderboards, achievements, and social flows
- designed with mobile and iPad layouts
- uses server-side validation patterns for competitive results

Avoid saying unless separately verified:

- exact user capacity
- enterprise-grade security
- production scale numbers
- App Store approval status
- revenue claims
- exact backend thresholds or implementation details
