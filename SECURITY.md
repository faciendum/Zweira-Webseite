# Security

## Scope

This repository contains a static public website. It does not contain native iOS code, user accounts, household databases, payment processing, or app-signing credentials.

The current deployed site and the latest source on the default branch are the maintained versions. Older snapshots are not maintained separately.

## Report a vulnerability privately

Email **[hallo@justanothercoder.de](mailto:hallo@justanothercoder.de)** with the subject **“Zweira security report”**.

Include the affected URL or file, a concise description, the potential impact, and safe reproduction steps. Avoid sending personal thoughts, household records, passwords, access tokens, or other sensitive data. If sensitive evidence is necessary, ask for an appropriate private exchange method first.

Please do not publish an exploitable issue or personal data in a public issue or pull request. Do not test against other people's accounts or data, perform destructive actions, or disrupt the live service. No response deadline or bug-bounty reward is promised.

## Website security model

- Scripts, fonts, screenshots, and artwork are served as first-party static files.
- The site has no forms that collect personal information and no application backend.
- Screenshot navigation, the handoff example, and motion controls operate locally in the browser.
- App Store links navigate to Apple; purchases never take place on this site.
- Hosting and request handling are provided by GitHub Pages.

Native-app concerns can use the same private contact address. A website change cannot validate or repair CloudKit permissions or StoreKit entitlements.
