# Bondfires Website

Static marketing site for [Bondfires](https://bondfires.org) — vanilla HTML/CSS/JS hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

The mobile app lives in the separate [bondfires](https://github.com/deggertsen/bondfires) monorepo.

## Local development

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (Cloudflare Pages)

This repo has **no build step** and **no dependencies**. Use native Pages Git integration — not Workers Builds.

1. Delete the old `bondfires-website` Worker Builds project in Cloudflare (if it exists).
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select this repository (`bondfires-website`).
4. Configure:

| Setting | Value |
|---|---|
| Project name | `bondfires-website` |
| Production branch | `main` |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | *(leave empty)* |

5. Deploy, then add custom domains under **Custom domains**:
   - `bondfires.org`
   - `www.bondfires.org`

Every push to `main` publishes automatically. No API tokens, deploy commands, or `SKIP_DEPENDENCY_INSTALL` needed.

## Project structure

```
├── index.html
├── *.html              # Other pages
├── 404.html
├── _headers            # Cloudflare cache rules
├── css/
├── js/
└── images/
```

## License

Copyright © 2026 Bondfires. All rights reserved.
