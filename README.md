# Sri Gurudevi Foundation learning preview

A responsive static learning site built with React, TypeScript, Vite, and Tailwind CSS. The design prioritizes short copy, strong contrast, three navigation choices, and a single primary action per screen.

## Run locally

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

Node 22 or newer is recommended. `dist/` is the static output. Relative assets and hash-based routes allow direct links and refreshes to work on GitHub Pages without server rewrite rules.

## Included

- Homepage, searchable learning library, course details, lesson reader, learning dashboard, about, contact, privacy, and account-status pages.
- Two introductory reading guides with three lessons each.
- Lesson completion timestamps, progress indicators, and last-visited lesson saved on the current browser.
- Corrupt or unavailable storage handling and synchronization between tabs.
- Link to the foundation’s actual free Song of Life course on Teachable.
- Mobile navigation, keyboard focus states, skip link, reduced-motion support, and meaningful form labels.
- GitHub Actions build, tests, and Pages deployment on pushes to `main`.

## Static preview limits

This is a published design and interaction prototype, not the completed production LMS from the development brief. It does not create student accounts, verify email, reset passwords, or synchronize progress between devices. No passwords or email addresses are collected. The account page explains this directly.

No official lesson videos or curriculum were supplied. The six short readings are clearly labelled editorial previews based on the foundation’s public teachings; they must be reviewed before being represented as an official curriculum. The actual Song of Life course remains on Teachable, which manages its registration and progress.

The lesson model supports optional `youtubeId` values. Adding an approved ID enables a click-to-load YouTube privacy-enhanced player. No sample or unrelated third-party videos have been inserted, and embedded playback has not been verified because no lesson video IDs are configured.

For production accounts, the remaining work is Supabase Auth and profile/enrollment/progress tables with row-level security, verified redirect URLs, Resend SMTP and domain configuration, and end-to-end testing using the foundation’s project. No secrets are needed to build this static version, and no service-role keys belong in browser code.

## Update content

Edit `src/courses.ts`. Course and lesson IDs are stable progress keys; avoid renaming them after launch without migrating progress. All content is separate from application logic. No CMS or admin interface is included.

## Publishing

The `.github/workflows/pages.yml` workflow installs the locked dependencies, runs progress tests, builds, and uploads the static artifact to GitHub Pages. In GitHub repository settings, Pages must use **GitHub Actions** as its source.

Official deployment references: [Vite on GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Content and images

The user’s Relume reference and supplied development brief informed the redesign. Original content was inspected in the user’s Chrome tab; the original Relume project was not modified.

- [Foundation homepage](https://www.srigurudevifoundation.org/)
- [Practices](https://www.srigurudevifoundation.org/practices)
- [Teacher](https://www.srigurudevifoundation.org/swami)
- [Membership and teaching](https://www.srigurudevifoundation.org/new-page-1)
- [Official Song of Life course](https://the-song-of-life-online.teachable.com/l/pdp/the-song-of-life-online-course)

`public/images/yantra.jpg`, `swami.jpg`, and `song-of-life.jpg` are the original foundation assets, retained without recolouring or redrawing the yantra. `quiet-valley.jpg` is an AI-generated atmospheric illustration, not a photograph of foundation premises. Font files are self-hosted using Fontsource. Icons are from Lucide.

## Verification

The production build and progress unit tests pass. Browser checks cover search and empty states, course navigation, completing all lessons, persistence after refresh, resume links, mobile navigation, expandable about sections, and no horizontal overflow at 320, 390, 768, and 1280 px on the tested pages. Desktop, mobile, and tablet screenshots were inspected. Keyboard focus moves to the next action after completion. Body text contrast is 11.56:1; secondary text is 5.59:1; white primary-button text is 9.30:1. These targeted checks are not a full accessibility certification.

## Premium visual refinement — 5 November 2026

The homepage uses original foundation photography, a shorter hero, warm ivory and charcoal with burgundy accents, and a three-item editorial learning collection. Course cards now show only the offering type, title, and duration; descriptions remain on the detail pages. The original yantra and course cover remain intact.

Desktop (1280 px), tablet (768 px), mobile (390 px), and narrow mobile (320 px) were checked in the browser. No horizontal overflow was observed; search, mobile navigation, and saved lesson resume were verified. No browser warnings or errors were recorded during the check. Core text contrast: {'ink_on_ivory': 14.18, 'secondary_on_ivory': 6.21, 'white_on_burgundy': 9.48, 'secondary_on_panel': 5.6}. Production build and both existing progress tests passed.

The learning platform remains a static preview with browser-local progress. Backend accounts and email are not configured.
