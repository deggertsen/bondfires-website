// Bondfires website Worker. Static pages come from the asset store; this only
// runs for the routes listed in wrangler.jsonc → assets.run_worker_first.
//
// /get → the right store for this device. Used by QR codes, in-app share
// sheets, and print. Desktop browsers go to /download, where a store link
// would otherwise be a dead end. `?c=<campaign>` becomes utm_campaign.
const APP_STORE = 'https://apps.apple.com/us/app/bondfires/id6755933598'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=org.bondfires'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/get' || url.pathname.startsWith('/get/')) {
      const ua = request.headers.get('user-agent') || ''
      const campaign = url.searchParams.get('c') || 'get'
      const utm = `utm_source=website&utm_medium=referral&utm_campaign=${encodeURIComponent(campaign)}`

      let target = `${url.origin}/download`
      if (/android/i.test(ua)) target = `${PLAY_STORE}&${utm}`
      else if (/iphone|ipad|ipod/i.test(ua)) target = `${APP_STORE}?${utm}`

      return Response.redirect(target, 302)
    }

    return env.ASSETS.fetch(request)
  },
}
