#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const read = (path) => readFileSync(resolve(root, path), 'utf8')
const json = (path) => JSON.parse(read(path))
const errors = []

const packageName = 'org.bondfires'
const relation = 'delegate_permission/common.handle_all_urls'
const fingerprintPattern = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/
const uploadFingerprint =
  'B9:61:12:91:E7:3A:13:96:A2:92:0A:03:BB:05:C4:61:B3:29:85:8D:3C:AE:C4:D5:7D:CF:BC:FA:44:CD:99:74'

const assetlinks = json('public/.well-known/assetlinks.json')
const statement = Array.isArray(assetlinks)
  ? assetlinks.find(
      (entry) =>
        entry?.target?.namespace === 'android_app' &&
        entry.target.package_name === packageName &&
        Array.isArray(entry.relation) &&
        entry.relation.includes(relation),
    )
  : undefined
const fingerprints = statement?.target?.sha256_cert_fingerprints
if (!statement) errors.push(`assetlinks.json is missing ${packageName}`)
if (!Array.isArray(fingerprints) || fingerprints.length !== 1) {
  errors.push('assetlinks.json must contain exactly one Play signing fingerprint')
} else {
  const fingerprint =
    typeof fingerprints[0] === 'string' ? fingerprints[0].trim().toUpperCase() : ''
  if (!fingerprintPattern.test(fingerprint)) errors.push('Play signing fingerprint is invalid')
  if (fingerprint === uploadFingerprint) errors.push('Upload certificate cannot authorize Play builds')
}

const aasa = json('public/.well-known/apple-app-site-association')
const details = Array.isArray(aasa?.applinks?.details) ? aasa.applinks.details : []
const applePaths = new Set(
  details.find((entry) => entry.appID === 'A9BJ2VA78M.org.bondfires')?.paths ?? [],
)
for (const path of ['/invite/*', '/invite/camp/*', '/invite/family/*', '/personal-bondfire/*']) {
  if (!applePaths.has(path)) errors.push(`AASA is missing ${path}`)
}

const redirects = new Set(read('public/_redirects').split(/\r?\n/))
for (const rule of [
  '/invite/:code /invite 200',
  '/invite/camp/:code /invite 200',
  '/invite/family/:code /invite 200',
  '/personal-bondfire/:bondfireId/:code /invite 200',
]) {
  if (!redirects.has(rule)) errors.push(`_redirects is missing: ${rule}`)
}

const headers = read('public/_headers')
for (const path of ['/.well-known/assetlinks.json', '/.well-known/apple-app-site-association']) {
  const start = headers.indexOf(path)
  const next = headers.indexOf('\n/', start + path.length)
  const block = start < 0 ? '' : headers.slice(start, next < 0 ? undefined : next)
  if (!block.includes('Content-Type: application/json')) errors.push(`${path} needs JSON MIME type`)
  if (!block.includes('X-Content-Type-Options: nosniff')) errors.push(`${path} needs nosniff`)
}

if (errors.length) {
  console.error(`App association validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log('Production app association files are valid.')
