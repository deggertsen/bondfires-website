export interface Faq {
  q: string
  a: string
  home?: boolean
}

export const FAQ: Faq[] = [
  {
    q: 'What is Bondfires?',
    home: true,
    a: 'Bondfires is an app where a small group keeps talking between meetups using short videos instead of text. Someone records a Bondfire, a video about what’s on their mind. The rest of the group watches and replies with their own videos whenever they have a few minutes.',
  },
  {
    q: 'Do we all need to be online at the same time?',
    home: true,
    a: 'No. That’s the point. You record when you have five minutes, your people reply when they have theirs. Early morning, lunch break, after the kids are down. The thread is always there.',
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
    a: 'Because your face and your voice carry what text drops. Tone, hesitation, a laugh, the thing you almost didn’t say. A two-minute video from a friend lands differently than two paragraphs.',
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
    q: 'How long can a video be?',
    a: 'Free members can respond with up to 5 minutes. Plus raises that to 15 minutes, Premium to 30, and Pro has no limit.',
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
