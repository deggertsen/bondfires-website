# Bondfires Website

Marketing site for [Bondfires](https://bondfires.org), built with [Astro](https://astro.build) and hosted on Cloudflare Pages.
The mobile app lives in the separate [bondfires](https://github.com/deggertsen/bondfires) monorepo.

## Local development

```bash
npm install
npm run dev        # Astro dev server with hot reload
npm run build      # static output → dist/
npm run preview    # serves dist/ through wrangler, including functions/ and _redirects
npm run og         # regenerate public/images/og-image.png (commit the result)
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
  legal/*.html      legal page bodies, ported verbatim from the previous site
  styles/global.css design tokens (mirror of docs/Brand Kit.js in the app repo)
public/
  _headers, _redirects, robots.txt, .well-known/, images/, favicon
functions/get.js    Pages Function: /get → App Store or Google Play by user agent
scripts/generate-og.mjs
```

## Deploy (Cloudflare Pages)

Every push to `main` deploys. The Pages project needs a build step now:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `NODE_VERSION=22` (environment variable) |

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
`bondfires.app` should redirect to it at the edge with a Cloudflare **Redirect Rule**
(`https://bondfires.app/*` → `https://bondfires.org/${1}`, 301) **except** requests to
`/.well-known/*`, which Apple and Google must be able to fetch directly on both hosts.

## URLs that must never break

These are linked from the app stores, the app, and transactional email:

- `/privacy`, `/terms`, `/community-guidelines`, `/child-safety`, `/delete-account`
  (the old `/*.html` forms are redirected by Pages automatically because the build
  emits `name.html` files — see `build.format: 'file'` in `astro.config.mjs`)
- `/invite`, `/invite/:code`, `/invite/camp/:code` (rewrites in `public/_redirects`)
- `/.well-known/apple-app-site-association` and `/.well-known/assetlinks.json`
- `/images/connection-interrupted.jpg` (Mux reconnect slate, referenced from `convex/videos.ts`)

### Android App Links

`public/.well-known/assetlinks.json` contains the SHA-256 of the **upload** signing
certificate (read from the release `.aab`). If Play App Signing is enabled for the
app, add the **App signing key certificate** fingerprint from
Play Console → Setup → App signing as a second entry.

## Content that still needs real assets

- Screenshots: `PhoneMock` renders a CSS version of the Home screen. Pass `src` with
  a real dark-theme screenshot (390×844 or 3×) to replace it.
- Founder portraits on `/about` and the homepage (currently initials).
- Testimonials from beta camps (none on the site yet; nothing is fabricated).

## License

Copyright © 2026 Bondfires. All rights reserved.
