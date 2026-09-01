import assert from 'node:assert/strict'
import test from 'node:test'
import {
  APPLE_APP_ID,
  PLAY_FINGERPRINT_MARKER,
  UPLOAD_FINGERPRINT,
  createAssetLinks,
  validateAasa,
  validateAssetLinks,
} from './lib/app-links.mjs'

const PLAY_FINGERPRINT =
  'AA:01:02:03:04:05:06:07:08:09:0A:0B:0C:0D:0E:0F:10:11:12:13:14:15:16:17:18:19:1A:1B:1C:1D:1E:1F'

test('production validation rejects the draft Play marker', () => {
  const draft = createAssetLinks(PLAY_FINGERPRINT)
  draft[0].target.sha256_cert_fingerprints[0] = PLAY_FINGERPRINT_MARKER
  assert.deepEqual(validateAssetLinks(draft), [
    'Google Play App Signing SHA-256 is still the draft marker',
    'Release assetlinks.json must begin with the Play signing certificate',
  ])
  assert.deepEqual(validateAssetLinks(draft, { allowDraftMarker: true }), [])
})

test('generator authorizes only Play signing by default', () => {
  const generated = createAssetLinks(PLAY_FINGERPRINT)
  assert.deepEqual(generated[0].target.sha256_cert_fingerprints, [PLAY_FINGERPRINT])
  assert.deepEqual(validateAssetLinks(generated), [])
})

test('generator includes the upload key only when explicitly requested', () => {
  const generated = createAssetLinks(PLAY_FINGERPRINT, { includeUpload: true })
  assert.deepEqual(generated[0].target.sha256_cert_fingerprints, [
    PLAY_FINGERPRINT,
    UPLOAD_FINGERPRINT,
  ])
  assert.deepEqual(validateAssetLinks(generated), [])
})

test('generator rejects a malformed Play fingerprint', () => {
  assert.throws(() => createAssetLinks('AA:BB'), /colon-delimited SHA-256/)
})

test('generator rejects the known upload key as the Play key', () => {
  assert.throws(() => createAssetLinks(UPLOAD_FINGERPRINT), /cannot be used as the Play signing/)
})

test('production validation does not mistake the known upload key for the Play key', () => {
  const uploadOnly = createAssetLinks(PLAY_FINGERPRINT, { includeUpload: true })
  uploadOnly[0].target.sha256_cert_fingerprints = [UPLOAD_FINGERPRINT]
  assert.deepEqual(validateAssetLinks(uploadOnly), [
    'The first fingerprint must be the Play signing certificate, not the upload key',
  ])
})

test('AASA covers invite, camp invite, and personal Bondfire paths', () => {
  const valid = {
    applinks: {
      details: [
        {
          appID: APPLE_APP_ID,
          paths: ['/invite/*', '/invite/camp/*', '/personal-bondfire/*'],
        },
      ],
    },
  }
  assert.deepEqual(validateAasa(valid), [])
  valid.applinks.details[0].paths.pop()
  assert.deepEqual(validateAasa(valid), ['AASA is missing /personal-bondfire/*'])
})
