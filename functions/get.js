// Cloudflare Pages Function: /get → the right store for this device.
// Used by QR codes, in-app share sheets, and print. Falls back to /download
// for desktop browsers, where a store link is a dead end.
const APP_STORE = 'https://apps.apple.com/us/app/bondfires/id6755933598'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=org.bondfires'

export function onRequest({ request }) {
  const ua = request.headers.get('user-agent') || ''
  const url = new URL(request.url)
  const campaign = url.searchParams.get('c') || 'get'
  const utm = `utm_source=website&utm_medium=referral&utm_campaign=${encodeURIComponent(campaign)}`

  let target = `${url.origin}/download`
  if (/android/i.test(ua)) target = `${PLAY_STORE}&${utm}`
  else if (/iphone|ipad|ipod/i.test(ua)) target = `${APP_STORE}?${utm}`

  return Response.redirect(target, 302)
}
