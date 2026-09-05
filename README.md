# Bondfires Website

Marketing site for [Bondfires](https://bondfires.org), built with [Astro](https://astro.build) and deployed as a Cloudflare Worker with static assets.
The mobile app lives in the separate [bondfires](https://github.com/deggertsen/bondfires) monorepo.

## Local development

```bash
npm install
npm run dev        # Astro dev server with hot reload
npm run build      # static output → dist/
npm run preview    # builds, then serves dist/ through the Worker (wrangler dev)
npm run og         # regenerate public/images/og-image.png (commit the result)
npm run validate   # check the app association files before touching .well-known/
```

## Structure

```
src/
  pages/            one .astro file per route (index, about, pricing, faq, download, get,
                    support, for/groups, for/mens-groups, invite, legal pages, 404)
  layouts/          Base.astro (head/SEO/nav/footer), Legal.astro
  components/       Nav, Footer, Logo, StoreBadges, Qr, PhoneMock, EmberCanvas
  lib/site.ts       store URLs, emails, nav, the three-step story
  lib/faq.ts        FAQ content (also drives FAQ structured data)
  legal/*.html      legal page bodies (privacy, terms, guidelines, child safety, delete account)
  styles/global.css design tokens (mirror of docs/Brand Kit.js in the app repo)
public/
  _headers, _redirects, robots.txt, .well-known/, images/, favicon
worker/index.js     Worker: /get → App Store or Google Play by user agent; else assets
scripts/generate-og.mjs
scripts/validate-app-links.mjs
```

## Deploy (Cloudflare Workers Builds)

Production is a Git-connected Worker (`bondfires-website`) using Workers Builds.
Every push to `main` installs dependencies, runs `npm run build` (from
`wrangler.jsonc` → `build.command`), and deploys `dist/` as static assets behind
the small Worker in `worker/index.js`. Pull requests get a preview build check.

- `worker/index.js` only handles `/get` (device-aware store redirect). Everything
  else is served from the asset store, with `public/_headers` and
  `public/_redirects` applied.
- No dashboard build settings are required beyond the Git connection. If the
  dashboard has a build command set, it should be empty or `npm run build`.
- Manual deploy from a machine with wrangler login: `npx wrangler deploy`.

Custom domains: `bondfires.org`, `www.bondfires.org`, `bondfires.app`.

Optional environment variables:

| Variable | Purpose |
|---|---|
| `PUBLIC_POSTHOG_KEY` | Enables the PostHog snippet. Omitted from the page when unset. |
| `PUBLIC_POSTHOG_HOST` | Defaults to `https://us.i.posthog.com`. |

Tracked events (only when PostHog is enabled): `store_click` (platform, campaign),
`nav_download_click`, `leader_contact_click`. Store links carry UTM parameters
(`utm_source=website`, `utm_campaign=<placement>`) so installs can be attributed
in App Store Connect / Play Console even without PostHog.

### Domains

`bondfires.org` is canonical; every page sets `<link rel="canonical">` to it.
`bondfires.app` is an alias and an associated domain for the app. If you add an
edge redirect from `.app` to `.org`, exclude `/.well-known/*`, which Apple and Google
must be able to fetch directly on both hosts.

## Mobile app association files

Before changing anything under `public/.well-known/`, `public/_redirects`, or
`public/_headers`, run:

```bash
npm run validate
```

The same check runs in CI (`.github/workflows/app-links.yml`) on every pull request.

`assetlinks.json` must contain the public **Google Play App Signing** SHA-256 from
**Google Play Console → Protected with Play → Play app signing**. Do not use the
EAS/local upload certificate; Google re-signs Play-distributed builds, and the
validator rejects the upload fingerprint.

## URLs that must never break

These are linked from the app stores, the app, and transactional email:

- `/privacy`, `/terms`, `/community-guidelines`, `/child-safety`, `/delete-account`
  (the old `/*.html` forms redirect automatically because the build emits
  `name.html` files and assets use `html_handling: auto-trailing-slash`; see
  `build.format: 'file'` in `astro.config.mjs`)
- `/invite`, `/invite/:code`, `/invite/camp/:code`, `/invite/family/:code`,
  `/personal-bondfire/:bondfireId/:code` (rewrites in `public/_redirects`)
- `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json`
- `/images/connection-interrupted.jpg` (Mux reconnect slate, referenced from `convex/videos.ts`)

## Content that still needs real assets

- Screenshots: `PhoneMock` renders a CSS version of the Home screen. Pass `src` with
  a real dark-theme screenshot (390×844 or 3×) to replace it.
- Founder portraits on `/about` and the homepage (currently initials).
- Testimonials from beta camps (none on the site yet; nothing is fabricated).

## License

Copyright © 2026 Bondfires. All rights reserved.
