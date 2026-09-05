// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Canonical host. bondfires.app is an alias that should 301 here at the edge
// (see README → "Domains").
export default defineConfig({
  site: 'https://bondfires.org',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Emit `about.html` rather than `about/index.html` so Cloudflare Pages keeps
    // serving the legacy `/about.html` URLs (it 308s them to `/about`) and the
    // app-store-linked legal URLs never break.
    format: 'file',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/invite') && !page.includes('/get') && !page.includes('/404'),
    }),
  ],
})
