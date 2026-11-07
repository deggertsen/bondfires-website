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
    a: 'A camp is a group’s home on Bondfires. Camps can be public or invite-only. A Hearth is a separate personal space where you invite people to individual conversations.',
  },
  {
    q: 'What is a hearth?',
    a: 'A Hearth is your personal space for conversations with the people closest to you. You choose who joins each conversation: you and one other person on Plus, or you and up to seven others on Premium or Pro. Hearths have their own notification setting.',
  },
  {
    q: 'Is it free?',
    home: true,
    a: 'Yes. Free members can join camps, watch everything, and respond with videos up to five minutes long. Starting your own Bondfires and running your own hearth are part of Plus. Leaders who want to run camps for their group use Pro.',
  },
  {
    q: 'Why video instead of text?',
    home: true,
    a: 'Because your face and your voice carry what text drops. Tone, hesitation, a laugh, the thing you almost didn’t say. A video from a friend lands differently than two paragraphs. And you don’t have to choose: automatic captions and summaries become available after processing, so you can skim a thread, or catch up somewhere you can’t listen.',
  },
  {
    q: 'I’m not comfortable on camera.',
    a: 'Most people aren’t at first. Start with a short hello to someone you trust. People with access to the conversation can watch while you record or catch up later, so choose your audience before you start. After a few Bondfires, most people forget the camera is there.',
  },
  {
    q: 'Who can see my videos?',
    home: true,
    a: 'Access depends on where you post. For a private camp, it follows camp membership; for a Hearth conversation, it follows that conversation’s invited participants. Public camps are for a wider audience in the app. People with access can watch while you record as well as afterward. Read the privacy policy for the full picture.',
  },
  {
    q: 'Do I have to watch everything?',
    a: 'No. Automatic captions, summaries, tags, and thread titles help you catch up after processing. You can read the gist of a thread in a few seconds and watch the ones that matter. Captions also mean you can follow along with the sound off.',
  },
  {
    q: 'How long can a video be?',
    a: 'As long as it needs to be, within your plan. Free members can respond with up to 5 minutes; Plus raises that to 15, Premium to 30, and Pro to 3 hours.',
  },
  {
    q: 'Can I bring my existing group?',
    a: 'That’s the best way to start. A group leader creates a camp, shares one invite link, and everyone lands in the same place. See the page for groups for how leaders set it up.',
  },
  {
    q: 'How do I delete my account?',
    a: 'From the app: Profile → Delete Account. Or follow the steps on the delete-account page. Your videos and data are removed on the schedule described there.',
  },
]
