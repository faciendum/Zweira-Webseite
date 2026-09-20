# Contributing

Thank you for helping improve Zweira's website. This repository covers the public marketing site, not the native app or its backend configuration.

## Useful contributions

- Clearer German wording that preserves the warm, calm voice.
- Accessibility improvements, responsive layout fixes, and broken-link corrections.
- Performance improvements that keep the static, dependency-free architecture.
- Corrections backed by actual product behavior or verified operator information.

Discuss substantial redesigns, new tracking tools, translations, licensing changes, or new dependencies with the maintainer before implementation.

## Workflow

1. Fork the repository and create a descriptive branch.
2. Run the static site locally using the instructions in [README.md](README.md).
3. Make a focused change and check it at a narrow mobile width and a desktop width.
4. Check keyboard navigation and reduced-motion behavior for changed interactions.
5. Run `git diff --check` and, if JavaScript changed, `node --check app.js`.
6. Open a pull request explaining the problem, the resulting behavior, and the checks you performed. Include before/after images for visual changes.

Write commit messages and technical documentation in English. Keep website copy in German unless a separately scoped translation is approved.

## Product and design boundaries

Use [docs/CONTENT.md](docs/CONTENT.md) as the product-copy reference. Do not equate Apple Family Sharing with household invitations, claim automatic sharing of private thoughts, promise instant synchronization, or turn demo content into customer testimonials.

Keep fonts and assets local. Do not add analytics, ad trackers, remote font services, user-data collection, or a backend as incidental changes.

## Public repository hygiene

Only commit synthetic example content in screenshots. Exclude credentials, signing assets, account tokens, real household data, local exports, browser profiles, and machine-specific paths. Do not add screenshots of personal notifications or private accounts.

Report vulnerabilities privately according to [SECURITY.md](SECURITY.md). General support goes to [hallo@justanothercoder.de](mailto:hallo@justanothercoder.de).

The repository does not currently grant a general open-source license; see the asset and licensing section in the README before reusing material.
