// Generates public/images/og-image.png (1200×630) from an inline SVG.
// Run: npm run og   (commit the result; the Pages build image has no fonts)
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../public/images/og-image.png')

const flame = `
  <path transform="translate(96 92) scale(3.4)" d="M16 2.5c.6 4.2 3.2 6.6 5.6 9.3 2.3 2.6 4.4 5.3 4.4 9.2 0 5.5-4.5 9.5-10 9.5S6 26.5 6 21c0-3.6 1.8-6.1 3.9-8.4-.1 2.2.9 3.7 2.4 4.4C11.7 11.4 13.8 7.4 16 2.5Z" fill="url(#f)"/>
  <path transform="translate(96 92) scale(3.4)" d="M16 15.5c.4 2.3 1.8 3.5 3 4.9 1.1 1.3 2 2.6 2 4.4 0 2.9-2.2 4.7-5 4.7s-5-1.8-5-4.7c0-1.7.8-2.9 1.9-4.1 0 1.1.5 1.8 1.2 2.1-.2-2.6.7-4.9 1.9-7.3Z" fill="#141416" opacity="0.92"/>
  <path transform="translate(96 92) scale(3.4)" d="M16 19.5c.3 1.4 1.1 2.1 1.8 2.9.6.7 1.2 1.5 1.2 2.5 0 1.7-1.3 2.8-3 2.8s-3-1.1-3-2.8c0-1 .5-1.7 1.1-2.4.1.6.4 1 .8 1.2-.1-1.5.4-2.8 1.1-4.2Z" fill="#F0AB68"/>
`

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="f" x1="16" y1="3" x2="16" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F0AB68"/><stop offset="0.55" stop-color="#D97736"/><stop offset="1" stop-color="#A04E24"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.55" r="0.55">
      <stop offset="0" stop-color="#D97736" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#D97736" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="1" r="0.5">
      <stop offset="0" stop-color="#D97736" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#D97736" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#141416"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  ${flame}
  <text x="226" y="170" font-family="Inter Tight, Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="44" fill="#F3F4F6" letter-spacing="-1">Bondfires</text>
  <text x="96" y="330" font-family="Inter Tight, Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#F3F4F6" letter-spacing="-3">Your group,</text>
  <text x="96" y="420" font-family="Inter Tight, Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#F0AB68" letter-spacing="-3">on your own time.</text>
  <text x="96" y="500" font-family="Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="400" font-size="30" fill="#9CA3AF">Short video conversations for small groups. Free on iOS and Android.</text>
  <rect x="96" y="548" width="1008" height="1" fill="#33353A"/>
  <text x="96" y="590" font-family="Inter, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="600" font-size="22" fill="#D97736" letter-spacing="3">BONDFIRES.ORG</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out)
console.log('wrote', out)
