/** Site-wide constants. Store URLs also live in the app repo at
 *  packages/app/src/hooks/useForceUpdate.ts — keep them identical. */
export const SITE_URL = 'https://bondfires.org'
export const SITE_NAME = 'Bondfires'
export const TAGLINE = 'Reclaim the Power of Conversation'

export const APP_STORE_URL = 'https://apps.apple.com/us/app/bondfires/id6755933598'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=org.bondfires'
export const IOS_MIN = 'iOS 15.0 or later'
export const ANDROID_MIN = 'Android 8.0 or later'

export const SUPPORT_EMAIL = 'support@bondfires.org'
export const PRIVACY_EMAIL = 'privacy@bondfires.org'
export const SAFETY_EMAIL = 'safety@bondfires.org'
export const LEGAL_EMAIL = 'legal@bondfires.org'

/** Append UTM params so store clicks can be attributed to the site. */
export function storeLink(base: string, source: string, medium = 'website') {
  const url = new URL(base)
  url.searchParams.set('utm_source', medium)
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', source)
  return url.toString()
}

/** Optional analytics. Set PUBLIC_POSTHOG_KEY in the Pages build environment
 *  to enable; the snippet is omitted entirely when it is unset. */
export const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined
export const POSTHOG_HOST = (import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com'

export const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/for/groups', label: 'For groups' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

/** The one three-step story. The app's onboarding and the store screenshots
 *  should tell exactly this one. */
export const STEPS = [
  {
    title: 'Join your camp, or start one.',
    body: 'A camp is your group’s home on Bondfires. Public, invite-only, or a hearth just for the people closest to you.',
  },
  {
    title: 'Spark a Bondfire.',
    body: 'Record what’s on your mind. A win, a question, something you’re wrestling with. Two minutes is plenty.',
  },
  {
    title: 'Your people respond with video, when they’re ready.',
    body: 'Responses stack into a thread. Watch on the train, reply from the driveway. The fire waits for you.',
  },
]
