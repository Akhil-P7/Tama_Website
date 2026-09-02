/**
 * Single source of truth for repeated site content.
 * Pages and JSON-LD both read from here, so marketing copy and structured
 * data can never drift out of sync.
 */

export const APP = {
  name: 'Tama',
  fullName: 'Tama AI',
  tagline: 'Your life, remembered.',
  packageName: 'com.tama.app',
  developer: 'Aditya Shukla & Akhil Pandey',
  email: 'thetama.ai@gmail.com',
  category: 'Lifestyle',
  contentRating: 'Mature 17+ / 18+',
  platform: 'Android',
  playUrl: 'https://play.google.com/store/apps/details?id=com.tama.app',
  /** Flip to true only once the Play listing is publicly live. */
  isLive: false,
  version: '1.0',
  lastUpdated: '2026-08-27',
  legalEffective: '27 August 2026',
} as const

/**
 * `icon` values are names in app/components/Icon.vue. They are deliberately
 * plain strings rather than emoji so the same mark renders identically on every
 * OS, inherits the surrounding text colour, and is skipped by screen readers.
 */
export const PRINCIPLES = [
  {
    icon: 'heart-hands',
    title: 'Never paywall the care',
    body: 'Conversation and proactive check-ins are free, forever, uncapped. The part of Tama that looks after you is not a subscription feature.',
  },
  {
    icon: 'book',
    title: 'Never paywall your own past',
    body: 'Every entry you create stays yours — always saved, always exportable, never deleted because you stopped paying.',
  },
  {
    icon: 'shield-check',
    title: 'Consent before acting on your behalf',
    body: 'Tama never messages someone in your life without asking you first, in the moment. There is no silent path — it does not exist in the code.',
  },
  {
    icon: 'sprout',
    title: 'No clinical language, ever',
    body: 'Tama may say “tonight felt heavy.” It will never say “you seem depressed.” It observes; it does not diagnose.',
  },
  {
    icon: 'circle-slash',
    title: 'No romantic roleplay, at any tier',
    body: 'A permanent product boundary, not a limitation we plan to lift or sell. Tama is a friend — not a partner substitute.',
  },
  {
    icon: 'search',
    title: 'Honest privacy claims only',
    body: 'We will not pretend nothing leaves your device — answering you requires a server. We tell you exactly what moves, and what never does.',
  },
] as const

export const FEATURES = [
  {
    slug: 'onboarding',
    icon: 'smile',
    badge: 'Under 90 seconds',
    title: 'Meet a personality, not a form',
    short: 'Tama introduces itself by voice and asks a few light questions. Switch to text-only from the very first screen.',
    body: 'Most apps open with a signup wall. Tama opens with a hello. It tells you who it is, asks what you would like to be called, how you would like it to talk to you, and who matters in your life. Voice is the default because it sets a tone — but there is a text-only toggle on screen one, for quiet rooms, shared spaces, and anyone who simply prefers typing.',
    points: [
      'Voice-introduced, with a visible text-only switch from the first screen',
      'Four tone options: Warm, Direct, Playful, Calm',
      'Every step is skippable — including adding people',
      'Completes in under 90 seconds end to end',
    ],
  },
  {
    slug: 'chat',
    icon: 'chat',
    badge: 'Free & uncapped care',
    title: 'A companion that actually remembers',
    short: 'Text or speak. Tama recalls what you told it days ago and brings it up the way a friend would.',
    body: 'Tama is not a chatbot with a costume on. On every single message it rebuilds a layered picture of you: the live conversation, the last two weeks of your days, a structured set of facts about the people and themes in your life, and the moments you flagged as significant. That is why it can ask how the thing with your manager went — unprompted, four days later.',
    points: [
      'Text chat is the reliable core; voice input transcribes into the same pipeline',
      'Four memory layers assembled fresh on every reply',
      'Learns how you write — length, formality, emoji — and calibrates to it',
      'Grows through familiarity stages: New → Established → Deep',
    ],
  },
  {
    slug: 'check-ins',
    icon: 'moon',
    badge: 'Signature feature',
    title: 'It notices before you say anything',
    short: 'With your permission, Tama watches for shifts in your own screen-time rhythm — and gently reaches out.',
    body: 'This is the feature people remember. If you have opted in, Tama learns your own baseline for total device time and notices when tonight looks unlike your usual — not against some universal threshold, against you last month. Then it writes you a real message about it. Not a canned notification: a specific, personal note that knows what has been going on in your life.',
    points: [
      'Explicit opt-in, in plain language, before anything is measured',
      'Aggregate device time only — never a per-app breakdown of what you opened',
      'Compared against your own rolling baseline, not a fixed number',
      'Your raw usage data never leaves your phone — only “deviation detected” does',
      'Free and uncapped at every tier',
    ],
  },
  {
    slug: 'special-people',
    icon: 'heart',
    badge: 'Consent-gated',
    title: 'Someone in your corner — on your terms',
    short: 'Name people you trust. Tama asks you before it ever reaches out to them. Every single time.',
    body: 'You can designate a few people — a sister, a partner, a best friend — who Tama may point toward on a hard night. Two rules make this trustworthy instead of alarming. They are told they have been added the moment you add them, so no first contact is ever a shock. And Tama asks you, in the chat, and shows you the exact draft, before anything sends. You can approve it, rewrite it, or say no.',
    points: [
      'They are notified at setup time, never surprised by a first alert',
      'You see and can edit the exact message before it goes',
      'Approve, edit, or decline — declining sends nothing, silently',
      'No automatic notification path exists anywhere in the system',
    ],
  },
  {
    slug: 'lifebook',
    icon: 'book-open',
    badge: 'Signature visual',
    title: 'Your days, quietly becoming a book',
    short: 'Every conversation is compiled into a journal entry, and the entries become a real, turnable book.',
    body: 'You never have to journal. You just talk, and at the end of the day Tama writes the entry for you — in its own narrative voice, about your life. Those entries stack into the Lifebook: a rendered single-page book view with a stitched spine, dog-eared corners, and page-turn physics. The first page unlocks after thirty days together, because it should feel earned rather than generated.',
    points: [
      'Daily conversations auto-summarise into a journal-style day page',
      'Entries render into a bound book with real page-turn animation',
      'Monthly and yearly recaps woven from your own months',
      'Free tier keeps every entry, forever, exportable',
    ],
  },
  {
    slug: 'moments',
    icon: 'camera',
    badge: 'Photo moments',
    title: 'Pictures, in their place',
    short: 'Attach a photo to a moment and find it again inside the day it belongs to.',
    body: 'A photo on its own is a file. A photo inside the day you lived is a memory. Attach images to moments and they are compressed, stored, and threaded into the right Lifebook page — alongside what you actually said about that day.',
    points: [
      'Compressed on upload to keep things fast and light',
      'Threaded into the matching Lifebook day page',
      'Push notifications for check-ins, approved alerts, and milestones',
      'Free tier includes a monthly photo allowance',
    ],
  },
] as const

export const TIERS = [
  { label: 'Companion chat', free: 'Unlimited, with a generous daily message allowance', premium: 'Unlimited, on the strongest available model' },
  { label: 'Proactive pattern check-ins', free: 'Full access, uncapped', premium: 'Full access, uncapped' },
  { label: 'Active memory recall', free: 'Rolling ~30-day window', premium: 'Full unlimited history' },
  { label: 'Your journal entries', free: 'Always saved, always exportable, never deleted', premium: 'Same — plus full Lifebook rendering' },
  { label: 'Lifebook visual book view', free: null, premium: 'Full designed book + monthly & yearly recaps' },
  { label: 'Special People', free: 'Up to 3', premium: 'Unlimited' },
  { label: 'Search every mention of a person', free: null, premium: 'Included' },
  { label: 'Photo moments', free: 'Monthly allowance, compressed', premium: 'Higher allowance, higher quality' },
  { label: 'Personalisation & journal themes', free: 'Basic', premium: 'Full customisation' },
  { label: 'Advertising', free: 'None, ever', premium: 'None, ever' },
] as const

export const FAQS = [
  {
    q: 'Is Tama a therapy or mental-health app?',
    a: 'No. Tama is a companion and journalling app, not a medical device, not a therapy service, and not a substitute for professional care. It is deliberately built never to use clinical or diagnostic language. If you are struggling, Tama will point you toward real human support rather than trying to treat you.',
  },
  {
    q: 'Is Tama a romantic or dating AI?',
    a: 'No, and it never will be. Tama does not do romantic or intimate roleplay at any subscription tier. This is a permanent product boundary written into the companion’s behaviour rules, not a feature we are holding back to sell later.',
  },
  {
    q: 'Does Tama read what apps I use?',
    a: 'No. If you opt in to pattern detection, Tama looks at your aggregate device screen time only — the total, never a breakdown of which apps you opened. That calculation happens on your phone. All that is ever sent to our servers is a small derived signal such as “deviation detected, magnitude significant.” Your raw usage log never leaves the device.',
  },
  {
    q: 'Can Tama message my friends or family without asking me?',
    a: 'No. There is no code path that allows it. Tama always asks you first, inside the chat, and shows you the exact draft message. You can approve it, edit it, or decline. On top of that, anyone you add as a Special Person is told at the moment you add them, so a message from Tama is never their first idea that they were listed.',
  },
  {
    q: 'What happens to my journal entries if I stop paying?',
    a: 'You keep them. Entries are never deleted for non-payment and remain exportable regardless of tier. A free account loses the visual Lifebook rendering and some of Tama’s fluent recall of older entries — it does not lose the entries themselves.',
  },
  {
    q: 'Are my conversations used to train AI models?',
    a: 'No. Your conversations are not sold, and are not used to train third-party models. We are also honest about the flip side: producing a reply genuinely requires sending your message to a language-model provider, so we will never claim nothing leaves your device. What we can say accurately is that data is encrypted in transit and at rest, minimised, never sold, never used for third-party training, and deletable on request.',
  },
  {
    q: 'Does Tama show ads?',
    a: 'No. There are no advertisements at any tier, free or premium.',
  },
  {
    q: 'How do I delete my account and all of my data?',
    a: 'From inside the app under Profile → Privacy & Data, or by emailing thetama.ai@gmail.com. Deletion actually removes your rows from the database and your files from storage — it is not a hidden soft-delete flag. Full instructions are on our account deletion page.',
  },
  {
    q: 'What age do I need to be to use Tama?',
    a: 'Tama is intended for adults, 18 and over. It is not designed or directed to children, and the app applies an age gate at signup.',
  },
  {
    q: 'Which platforms is Tama on?',
    a: 'Android first, via Google Play. Tama’s shared logic is written in Kotlin Multiplatform specifically so that iOS is a port rather than a rewrite — an iOS release follows once the Android core is proven.',
  },
] as const

export const NAV = [
  { name: 'Features', path: '/features' },
  { name: 'Lifebook', path: '/lifebook' },
  { name: 'Plans', path: '/pricing' },
  { name: 'Trust & Safety', path: '/safety' },
  { name: 'Support', path: '/support' },
] as const

/**
 * Header navigation, shaped for a mega-menu.
 *
 * An item with `groups` renders as a dropdown panel; an item with only `path`
 * renders as a plain link. `art` is the decorative illustration shown inside
 * the panel — the flourish discord.com puts in the corner of each of its
 * dropdowns.
 */
export const MENU = [
  {
    name: 'Product',
    art: '/images/tama_open_lifebook.png',
    artAlt: '',
    groups: [
      {
        heading: 'Explore',
        links: [
          {
            name: 'All features',
            path: '/features',
            blurb: 'The complete v1 feature set, honestly scoped',
          },
          {
            name: 'The Lifebook',
            path: '/lifebook',
            blurb: 'Your days, compiled into a book you can turn',
          },
          {
            name: 'How memory works',
            path: '/memory',
            blurb: 'The four layers rebuilt on every reply',
          },
        ],
      },
      {
        heading: 'Plans',
        links: [
          {
            name: 'Free vs Premium',
            path: '/pricing',
            blurb: 'What is free forever, and what is not',
          },
          {
            name: "What's new",
            path: '/updates',
            blurb: 'Release notes and what changed',
          },
        ],
      },
    ],
  },
  {
    name: 'Trust',
    art: '/images/tama_cozy_night.png',
    artAlt: '',
    groups: [
      {
        heading: 'Our commitments',
        links: [
          {
            name: 'Trust & safety',
            path: '/safety',
            blurb: 'The boundaries that do not move',
          },
          {
            name: 'Data safety summary',
            path: '/data-safety',
            blurb: 'Exactly what we collect, line by line',
          },
        ],
      },
      {
        heading: 'The fine print',
        links: [
          { name: 'Privacy policy', path: '/privacy', blurb: 'Readable, not impressive' },
          { name: 'Terms of use', path: '/terms', blurb: 'What you agree to' },
          {
            name: 'Delete your data',
            path: '/delete-account',
            blurb: 'Real rows removed, not a hidden flag',
          },
        ],
      },
    ],
  },
  {
    name: 'About',
    art: '/images/tama_sunset_hill.png',
    artAlt: '',
    groups: [
      {
        heading: 'The project',
        links: [
          {
            name: 'About & roadmap',
            path: '/about',
            blurb: 'Who builds this, and what is next',
          },
          { name: 'Press kit', path: '/press', blurb: 'Assets, facts and boilerplate' },
          {
            name: 'For AI agents',
            path: '/for-agents',
            blurb: 'Machine-readable facts about Tama',
          },
        ],
      },
    ],
  },
  { name: 'Support', path: '/support' },
] as const
