# Deployment and repository metadata

## Public endpoints

- Website: `https://zweira.de/`
- Privacy: `https://zweira.de/datenschutz.html`
- Legal notice: `https://zweira.de/impressum.html`
- App Store: `https://apps.apple.com/de/app/zweira-share-the-mental-load/id6814119210`
- Repository: `https://github.com/faciendum/Zweira-Webseite`

The German App Store storefront is deliberate. Changing `/de/` to `/us/` changes the storefront, not the application ID.

**Availability check, 20 September 2026:** both supplied App Store storefront URLs returned HTTP 404 during this website update. The intended URL is wired throughout the site, but the public product page must be checked again after Apple's publication process. Do not treat the presence of the link as proof of a released app.

**Week-start update, 2 November 2026:** the public homepage, privacy page and German App Store page resolve successfully. The existing Pages source is `main` at `/`, with `zweira.de` and HTTPS unchanged. The legal notice is restored byte-for-byte from its previously published version to repair its existing 404.

Version 1.7 is still described as the next app update until App Review releases it. The German Pro schedule is €19.99 per year or €59.99 lifetime from 3 November 2026, midnight CET (`2026-11-03T00:00:00+01:00`). Static copy keeps that date explicit; JavaScript updates the promotional heading at and after the boundary. The App Store purchase screen is authoritative.

Local verification covers 1440, 390 and 320 px layouts, additional tablet widths, keyboard screenshot navigation, the mobile menu, both handoff demo outcomes, reduced motion, local assets and the price activation boundary. There are no new dependencies, trackers or backend services.

## Static hosting

The domain is served by GitHub Pages. The site does not need a Node.js build, environment variables, API credentials, or a native iOS checkout.

Use the existing GitHub Pages configuration under **Settings → Pages**. Check the currently selected publishing source before changing it. A deployment must serve `index.html`, the two legal pages, `404.html`, CSS, JavaScript, `assets/`, `robots.txt`, and `sitemap.xml` at the domain root.

Preserve the repository's `CNAME` value (`zweira.de`) and the existing domain configuration. Do not change DNS or Pages permissions as part of routine copy or artwork updates. GitHub Pages supports a root-level `404.html` for unknown routes. The local Python preview server uses its own 404 response; open `/404.html` directly to preview the design locally.

Publishing website changes does not deploy CloudKit schemas, enable purchase Family Sharing, configure App Store products, or release an iOS build.

## Suggested GitHub About fields

**Description**

```text
Official website for Zweira, the iPhone and iPad app for sharing the mental load. Private thoughts, shared responsibility, and a calmer everyday life. Built with accessible HTML, CSS, and vanilla JavaScript.
```

**Website:** `https://zweira.de`

**Topics:** `zweira`, `mental-load`, `ios-app`, `landing-page`, `static-site`, `accessibility`, `vanilla-js`, `github-pages`

These are repository settings, not values GitHub reads from README files. An authenticated maintainer can set them in the repository's About panel. With GitHub CLI:

```sh
gh repo edit faciendum/Zweira-Webseite \
  --description "Official website for Zweira, the iPhone and iPad app for sharing the mental load. Private thoughts, shared responsibility, and a calmer everyday life. Built with accessible HTML, CSS, and vanilla JavaScript." \
  --homepage "https://zweira.de"
```

## Release checklist

1. Preview locally and check the hero, the five-image gallery, the free/Pro section, the legal pages, and the 404 design at mobile and desktop widths.
2. Check the menu, four screenshot tabs, both handoff results and reset, gallery controls, linked FAQ answers, and the animation pause button.
3. Check keyboard focus and a reduced-motion setting. Check that the page has no horizontal overflow at narrow widths, while the gallery remains intentionally scrollable.
4. Check the App Store URL externally. It must resolve to the intended app before announcing availability.
5. Confirm all local image/font/CSS/JS requests succeed and the browser console has no errors.
6. Check canonical URLs, social image, application ID, support address, sitemap, and the current hosting disclosure.
7. Run `git diff --check` and `node --check app.js` if Node.js is available.
8. Review the diff and publish through the repository's configured Pages workflow. After deployment, verify the live site and legal URLs over HTTPS.

When changing `styles.css`, `legal.css`, or `app.js`, update their query-string cache versions in the HTML references. Use content hashes or a consistent release identifier so visitors receive the intended files.

## Rollback

Revert the specific website commit in Git and publish through the same Pages source. Keep domain configuration and `CNAME` unchanged. There is no database migration or application state to roll back in this repository.
