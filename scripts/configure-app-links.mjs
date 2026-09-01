#!/usr/bin/env node

import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeAssetLinks } from './lib/app-links.mjs'

const index = process.argv.indexOf('--play-sha256')
const fingerprint = index >= 0 ? process.argv[index + 1] : process.env.PLAY_APP_SIGNING_SHA256
if (!fingerprint) {
  console.error('Pass --play-sha256 or set PLAY_APP_SIGNING_SHA256')
  process.exit(1)
}

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const includeUpload = process.argv.includes('--include-upload')
writeAssetLinks(root, fingerprint, { includeUpload })
console.log(
  `Updated .well-known/assetlinks.json with the Play signing certificate${
    includeUpload ? ' and the explicitly requested upload certificate' : ''
  }.`,
)
