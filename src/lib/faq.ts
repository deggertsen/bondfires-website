export interface Faq {
  q: string
  a: string
  home?: boolean
}

export const FAQ: Faq[] = [
  {
    q: 'What is Bondfires?',
    home: true,
    a: 'Bondfires is an app where a small group keeps talking between meetups using video instead of text. Someone records a Bondfire, a video about what’s on their mind. The rest of the group watches and replies with their own videos whenever they have a few minutes.',
  },
  {
    q: 'Do we all need to be online at the same time?',
    home: true,
    a: 'No. That’s the point. You record when you have time, your people reply when they have theirs. Early morning, lunch break, after the kids are down. The thread is always there.',
  },
  {
    q: 'What is a camp?',
    a: 'A camp is a group’s home on Bondfires. Camps can be public (anyone can join), private (invite-only, run by a group leader), or a hearth, which is your own small space for the people closest to you.',
  },
  {
    q: 'What is a hearth?',
    a: 'A hearth is a private camp just for you and the people you invite: close friends, siblings, your kids who moved away. You control who is in it. Hearth notifications also cut through mute, because those are the people you never want to miss.',
  },
  {
    q: 'Is it free?',
    home: true,
    a: 'Yes. Free members can join camps, watch everything, and respond with videos up to five minutes long. Starting your own Bondfires and running your own hearth are part of Plus. Leaders who want to run camps for their group use Pro.',
  },
  {
    q: 'Why video instead of text?',
    home: true,
    a: 'Because your face and your voice carry what text drops. Tone, hesitation, a laugh, the thing you almost didn’t say. A video from a friend lands differently than two paragraphs. And you don’t have to choose: every Bondfire gets captions and a short written summary, so you can skim a thread, or catch up somewhere you can’t listen.',
  },
  {
    q: 'I’m not comfortable on camera.',
    a: 'Most people aren’t at first. You record in private, on your own time, and you can re-record before you post. Nobody is watching you live. After a few Bondfires, most people forget the camera is there.',
  },
  {
    q: 'Who can see my videos?',
    home: true,
    a: 'Only the members of the camp you posted in. Bondfires are never public on the internet, we don’t sell your data, and we don’t use your conversations for advertising. Read the privacy policy for the full picture.',
  },
  {
    q: 'Do I have to watch everything?',
    a: 'No. Every Bondfire is captioned and gets a short written summary and a few tags, and each thread gets a title. You can read the gist of a thread in a few seconds and watch the ones that matter. Captions also mean you can follow along with the sound off.',
  },
  {
    q: 'How long can a video be?',
    a: 'As long as it needs to be, within your plan. Free members can respond with up to 5 minutes; Plus raises that to 15, Premium to 30, and Pro has no limit. Camp leaders can also set a shorter limit for their own camp if they want responses kept tight.',
  },
  {
    q: 'Can I bring my existing group?',
    a: 'That’s the best way to start. A group leader creates a camp, shares one invite link, and everyone lands in the same place. See the page for groups for how leaders set it up.',
  },
  {
    q: 'How do I delete my account?',
    a: 'From the app: Profile → Settings → Delete account. Or follow the steps on the delete-account page. Your videos and data are removed on the schedule described there.',
  },
]
