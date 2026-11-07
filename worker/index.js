// Bondfires website Worker. Static pages come from the asset store; this only
// runs for the routes listed in wrangler.jsonc → assets.run_worker_first.
//
// /get → closed-testing opt-in for this device. Used by QR codes, in-app share
// sheets, and print. Desktop browsers go to /download. `?c=<campaign>` becomes
// utm_campaign. Keep these in sync with IOS_DOWNLOAD_URL / ANDROID_DOWNLOAD_URL
// in src/lib/site.ts.
const IOS_DOWNLOAD = 'https://testflight.apple.com/join/2v553mf9'
const ANDROID_DOWNLOAD = 'https://play.google.com/apps/testing/org.bondfires'

function withCampaign(base, campaign) {
  const target = new URL(base)
  target.searchParams.set('utm_source', 'website')
  target.searchParams.set('utm_medium', 'referral')
  target.searchParams.set('utm_campaign', campaign)
  return target.toString()
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/get' || url.pathname.startsWith('/get/')) {
      const ua = request.headers.get('user-agent') || ''
      const campaign = url.searchParams.get('c') || 'get'

      let target = `${url.origin}/download`
      if (/android/i.test(ua)) target = withCampaign(ANDROID_DOWNLOAD, campaign)
      else if (/iphone|ipad|ipod/i.test(ua)) target = withCampaign(IOS_DOWNLOAD, campaign)

      return Response.redirect(target, 302)
    }

    return env.ASSETS.fetch(request)
  },
}
