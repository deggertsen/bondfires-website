#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readJson, validateAasa, validateAssetLinks } from './lib/app-links.mjs'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const allowDraftMarker = process.argv.includes('--allow-draft-marker')
const errors = [
  ...validateAssetLinks(readJson(root, '.well-known/assetlinks.json'), { allowDraftMarker }),
  ...validateAasa(readJson(root, '.well-known/apple-app-site-association')),
]

const redirects = readFileSync(resolve(root, '_redirects'), 'utf8')
for (const route of [
  '/invite/:code /invite 200',
  '/invite/camp/:code /invite 200',
  '/personal-bondfire/:bondfireId/:code /invite 200',
]) {
  if (!redirects.split(/\r?\n/).includes(route)) errors.push(`_redirects is missing: ${route}`)
}

const headers = readFileSync(resolve(root, '_headers'), 'utf8')
for (const file of ['/.well-known/assetlinks.json', '/.well-known/apple-app-site-association']) {
  const start = headers.indexOf(file)
  if (start < 0) {
    errors.push(`_headers is missing ${file}`)
    continue
  }
  const nextRule = headers.indexOf('\n/', start + file.length)
  const block = headers.slice(start, nextRule < 0 ? undefined : nextRule)
  if (!block.includes('Content-Type: application/json')) {
    errors.push(`${file} must be served as application/json`)
  }
  if (!block.includes('X-Content-Type-Options: nosniff')) {
    errors.push(`${file} must disable content-type sniffing`)
  }
}

if (errors.length > 0) {
  console.error(`App association validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(
  allowDraftMarker
    ? 'Draft app association structure is valid; Play signing fingerprint is still required.'
    : 'Production app association files are valid.',
)
