import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const PACKAGE_NAME = 'org.bondfires'
export const APPLE_APP_ID = 'A9BJ2VA78M.org.bondfires'
export const PLAY_FINGERPRINT_MARKER = 'PLAY_APP_SIGNING_SHA256_FROM_GOOGLE_PLAY_CONSOLE'
export const UPLOAD_FINGERPRINT =
  'B9:61:12:91:E7:3A:13:96:A2:92:0A:03:BB:05:C4:61:B3:29:85:8D:3C:AE:C4:D5:7D:CF:BC:FA:44:CD:99:74'
export const REQUIRED_APPLE_PATHS = [
  '/invite/*',
  '/invite/camp/*',
  '/invite/family/*',
  '/personal-bondfire/*',
]

const SHA256_PATTERN = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/
const HANDLE_ALL_URLS = 'delegate_permission/common.handle_all_urls'

export function normalizeFingerprint(value) {
  return typeof value === 'string' ? value.trim().toUpperCase() : ''
}

export function validateFingerprint(value) {
  return SHA256_PATTERN.test(normalizeFingerprint(value))
}

export function createAssetLinks(playFingerprint, { includeUpload = false } = {}) {
  const normalized = normalizeFingerprint(playFingerprint)
  if (!validateFingerprint(normalized)) {
    throw new Error('Play App Signing fingerprint must be a colon-delimited SHA-256 value')
  }
  if (normalized === UPLOAD_FINGERPRINT) {
    throw new Error('The known upload certificate cannot be used as the Play signing certificate')
  }
  return [
    {
      relation: [HANDLE_ALL_URLS],
      target: {
        namespace: 'android_app',
        package_name: PACKAGE_NAME,
        sha256_cert_fingerprints: [
          normalized,
          ...(includeUpload ? [UPLOAD_FINGERPRINT] : []),
        ],
      },
    },
  ]
}

export function validateAssetLinks(document, { allowDraftMarker = false } = {}) {
  const errors = []
  if (!Array.isArray(document)) return ['assetlinks.json must be an array']
  const statement = document.find(
    (entry) =>
      entry?.target?.namespace === 'android_app' &&
      entry?.target?.package_name === PACKAGE_NAME &&
      entry?.relation?.includes(HANDLE_ALL_URLS),
  )
  if (!statement) return [`Missing ${HANDLE_ALL_URLS} statement for ${PACKAGE_NAME}`]
  const fingerprints = statement.target.sha256_cert_fingerprints
  if (!Array.isArray(fingerprints) || fingerprints.length === 0) {
    return ['assetlinks.json must contain certificate fingerprints']
  }
  const normalized = fingerprints.map(normalizeFingerprint)
  if (new Set(normalized).size !== normalized.length) {
    errors.push('assetlinks.json contains duplicate certificate fingerprints')
  }
  const markers = normalized.filter((value) => value === PLAY_FINGERPRINT_MARKER)
  if (markers.length > 0 && !allowDraftMarker) {
    errors.push('Google Play App Signing SHA-256 is still the draft marker')
  }
  if (markers.length > 1) errors.push('assetlinks.json contains more than one draft marker')
  for (const fingerprint of normalized.filter((value) => value !== PLAY_FINGERPRINT_MARKER)) {
    if (!validateFingerprint(fingerprint)) errors.push(`Malformed SHA-256 fingerprint: ${fingerprint}`)
  }
  if (!allowDraftMarker && normalized[0] === UPLOAD_FINGERPRINT) {
    errors.push('The first fingerprint must be the Play signing certificate, not the upload key')
  }
  if (!allowDraftMarker && !validateFingerprint(normalized[0])) {
    errors.push('Release assetlinks.json must begin with the Play signing certificate')
  }
  return errors
}

export function validateAasa(document) {
  const details = document?.applinks?.details
  if (!Array.isArray(details)) return ['AASA applinks.details must be an array']
  const entry = details.find((value) => value?.appID === APPLE_APP_ID)
  if (!entry) return [`AASA is missing ${APPLE_APP_ID}`]
  const paths = new Set(entry.paths ?? [])
  return REQUIRED_APPLE_PATHS.filter((path) => !paths.has(path)).map(
    (path) => `AASA is missing ${path}`,
  )
}

export function readJson(root, file) {
  return JSON.parse(readFileSync(resolve(root, file), 'utf8'))
}

export function writeAssetLinks(root, playFingerprint, options) {
  const document = createAssetLinks(playFingerprint, options)
  writeFileSync(
    resolve(root, '.well-known/assetlinks.json'),
    `${JSON.stringify(document, null, 2)}\n`,
    'utf8',
  )
}
