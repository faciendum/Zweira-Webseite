# Content and visual guide

## Voice

Zweira addresses the invisible planning behind everyday life. Write warm, concrete German for two people sharing a household. Lead with relief and clarity rather than productivity targets, pressure, scores, or blame.

The campaign line is **“Weniger im Kopf. Mehr wir.”** Prefer small, recognizable situations: remembering an appointment, packing a child's bag, handing over a task, or making room for an evening together.

## Product distinctions

Keep three different concepts separate:

1. **Private thoughts:** local to a person's device. Nothing is automatically visible to their partner. Explicit sharing or conversion to a shared task is a separate action.
2. **Household invitation:** a private CloudKit invitation between two iCloud accounts. This is free and does not require an Apple Family group. The invited person needs a profile and must not already have another local or shared household; existing households are not merged automatically.
3. **Apple Family Sharing:** eligible purchase entitlements, subject to Apple's product and account settings. It does not create a shared household or reveal private thoughts.

The household supports two signed-in people. Children, relatives, and pets are descriptive task contexts, not additional accounts.

Ordinary tasks, dates, thoughts, invitations, family context, and complete JSON data exports are free. Pro adds reminders, widgets, calendar integration, new recurring tasks, insights and achievements, gentle task feedback, custom colors, and readable plan exports. The annual subscription and lifetime purchase are alternatives. Do not hard-code unverified prices or promise that every purchase is automatically shared.

Calendar connection is optional and requires permission. Selected device-calendar events shown in Today are not automatically added to the shared household. Native iPhone targeting does not guarantee that Apple prevents iPad compatibility-mode installation; the website should say **“für iPhone”**, not claim a universal installation block.

## Screenshots

The website uses real German app screenshots and the approved App Store campaign. All shown household content is example data.

| File | Content |
| --- | --- |
| `assets/screenshots/today.webp` | Today overview and thought capture |
| `assets/screenshots/thoughts.webp` | Private thoughts with categories and dates |
| `assets/screenshots/responsibilities.webp` | Shared responsibilities and task requests |
| `assets/screenshots/together.webp` | Household members and family context |
| `assets/stories/02-gedanken-ablegen.webp` | Giving thoughts a place |
| `assets/stories/03-verantwortung-teilen.webp` | Sharing responsibility |
| `assets/stories/05-euer-tag.webp` | Tasks and calendar events, with a Pro calendar label |
| `assets/stories/07-fuer-alle-mitdenken.webp` | Children, relatives, and pets |
| `assets/stories/08-platz-fuer-schoenes.webp` | Ideas for meaningful moments |

Screens are exported at 720 px wide. Campaign images are 660 × 1434 px; their source artwork was 1320 × 2868 px. WebP keeps the repository and downloads compact. Preserve aspect ratio, keep text legible, set width/height and meaningful alt text, and lazy-load below-the-fold artwork. Do not alter the text inside a real app screenshot to imply a feature the app does not have.

Replace stale screenshots when the actual UI changes. Use the app's separate screenshot/demo dataset, never a real person's household. Keep original full-resolution campaign exports outside this website repository.

## Design system

| Token | Value | Purpose |
| --- | --- | --- |
| Paper | `#F8F5EF` | Page background |
| Ink | `#392F3D` | Text and Pro surface |
| Sage | `#DDE8D8` | Shared space, calm accents |
| Lavender | `#E8E0F2` | Thoughts, relationships |
| Butter | `#F5E8BD` | Today, gentle attention |
| Terracotta | `#AE5647` | Small drawings and focus cues |

Fraunces is the local heading typeface; body copy uses the system sans-serif stack. Brand marks and illustrations are first-party assets. Preserve the slightly imperfect drawn line quality. Motion should stay small, slow, decorative, and pausable. Never move essential controls, auto-advance the screenshots, or require an animation to understand a feature.

## Accessibility and interaction

- Preserve real headings, links, buttons, lists, and native `details`/`summary` elements.
- Screenshot tabs support arrow keys, Home/End, and visible focus. Each tab controls a separately labeled panel.
- The gallery keeps native touch and keyboard scrolling and also has explicit previous/next controls.
- The handoff example announces the result with a polite live region and supports resetting.
- System reduced-motion preferences take precedence; the footer can pause optional animations for the current page session.
- Content remains readable without JavaScript. The first screenshot and the native gallery remain available; interactive enhancements require JavaScript.

## Metadata and legal content

Use `https://zweira.de` in canonical URLs, structured metadata, social metadata, robots, and the sitemap. App Store links use the fixed application ID `6814119210` and the `/de/` storefront. `assets/social-preview.png` is the social image; the same file introduces the README.

Do not fabricate ratings, customer testimonials, download counts, or release dates. Update hosting statements, contact details, and the privacy-page date when the corresponding facts change. Font licensing stays in `assets/OFL-Fraunces.txt`.
