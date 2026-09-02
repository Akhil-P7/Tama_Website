<script setup lang="ts">
useTamaSeo({
  bareTitle: true,
  title: 'Tama — An AI Companion That Remembers Your Life',
  description:
    'Tama is an AI companion that listens to your day, remembers the people who matter, gently notices when something feels off, and compiles your life into a beautiful journal — your Lifebook. No ads. No romantic roleplay. Care is never paywalled.',
  path: '/',
  image: '/images/og-default.jpg',
  schema: [
    {
      '@type': 'FAQPage',
      '@id': 'https://usetama.me/#faq',
      mainEntity: FAQS.slice(0, 6).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
})

const trustPills = [
  { icon: 'circle-slash', text: 'No ads, at any tier' },
  { icon: 'heart-hands', text: 'Care is free forever' },
  { icon: 'book', text: 'Your entries are always yours' },
  { icon: 'lock', text: 'Usage data stays on your phone' },
] as const

/** Words for the marquee strip between the hero and the first feature band. */
const marqueeWords = [
  'listens',
  'remembers',
  'notices',
  'checks in',
  'writes it down',
  'asks first',
]

const steps = [
  {
    n: '01',
    title: 'It notices',
    body: 'Three late nights in a row — measured against your own baseline from last month, not a universal threshold. The maths happens on your device.',
    tag: 'On-device',
  },
  {
    n: '02',
    title: 'It reaches out',
    body: 'A real message, with full context on what has been going on in your life lately. Not a canned push notification.',
    tag: 'Personal',
  },
  {
    n: '03',
    title: 'It asks — never assumes',
    body: 'If the night feels heavy, Tama offers to tell someone you trust, and shows you the exact draft. Nothing sends on its own.',
    tag: 'Consent-gated',
  },
]

const privacyTruths = [
  'Your raw screen-time log never leaves your phone — only a signal like “deviation detected” does',
  'Data is encrypted in transit and at rest',
  'Never sold. Never used to train third-party models.',
  'One-tap deletion that removes real rows and real files, not a hidden flag',
  'No advertising identifiers, because there is no advertising',
]
</script>

<template>
  <div>
    <!-- ================================================== HERO ========== -->
    <section class="hero band">
      <div class="hero-glow" aria-hidden="true" />
      <StarScatter field="dense" />

      <div class="wrap wrap-wide hero-inner">
        <div class="hero-copy center">
          <p class="eyebrow center-eyebrow">AI companion · Android</p>
          <h1 class="display">
            your life,
            <span class="italic">remembered.</span>
          </h1>
          <p class="lede lede-lg center-lede hero-lede">
            Tama listens to your day, remembers the people in it, quietly notices when
            something feels off — and turns all of it into a book you will actually want
            to read.
          </p>

          <div class="btn-row center hero-actions">
            <StoreBadge />
            <NuxtLink to="/features" class="btn-text">
              or see how it works<Icon name="arrow-right" />
            </NuxtLink>
          </div>

          <ul class="pill-row">
            <li v-for="p in trustPills" :key="p.text">
              <Icon :name="p.icon" /> {{ p.text }}
            </li>
          </ul>
        </div>

        <!-- Layered stage: the mascot with real product artefacts floating
             around it, the way Discord arranges its character cutouts. -->
        <div class="stage">
          <div class="halo" aria-hidden="true" />
          <TamaMascot variant="hero" interactive class="mascot float" />

          <figure class="fl fl-a">
            <blockquote>How did the thing with your manager end up going?</blockquote>
            <figcaption>Tama · Tuesday, unprompted</figcaption>
          </figure>

          <figure class="fl fl-b">
            <blockquote>
              It is later than usual and you have been on your phone a while. Everything
              okay tonight?
            </blockquote>
            <figcaption><Icon name="moon" />sent quietly · 11:42 PM</figcaption>
          </figure>

          <figure class="fl fl-c">
            <p class="fl-date">Thursday, 14 August</p>
            <blockquote>
              You were quiet most of the morning, then Priya called and the whole day
              turned. You laughed about the balcony plant again.
            </blockquote>
            <figcaption><Icon name="book-open" />Lifebook · written for you</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ================================================ MARQUEE ========= -->
    <Marquee :words="marqueeWords" tone="night" :duration="38" />

    <!-- ============================================== THE PREMISE =======
         Row 1 of the zig-zag: copy left, art right. Copy always comes first in
         the DOM so the heading leads for screen readers; `.zig-flip` is what
         swaps the visual sides on the alternating rows. -->
    <section class="section band band-white">
      <div class="wrap zig">
        <div class="zig-copy reveal">
          <p class="eyebrow">Why Tama exists</p>
          <h2 class="h-lower">
            most AI remembers your prompts.<br />
            tama remembers your <span class="italic">people.</span>
          </h2>
          <p class="lede">
            A generic assistant starts from zero every time you open it. Tama does the
            opposite — it rebuilds a layered picture of your life before every single
            reply: this conversation, your last two weeks, the people you have named, and
            the moments that mattered.
          </p>
          <p class="lede">
            That is why it can bring something up four days later without being asked.
          </p>
          <NuxtLink to="/memory" class="btn-text">
            see how the memory works<Icon name="arrow-right" />
          </NuxtLink>
        </div>

        <div class="reveal" style="--reveal-delay: 90ms">
          <div class="shot">
            <img
              src="/images/tama_sunset_hill.png"
              alt="Tama sitting on a grassy hilltop at sunset, watching the sky with a small notebook resting beside it."
              width="1200"
              height="896"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================= SIGNATURE MOMENT =======
         Row 2: flipped, so the product shot sits left and the copy right. -->
    <section class="section band-night">
      <StarScatter field="seam" />

      <div class="wrap zig zig-flip zig-lean sig-inner">
        <div class="zig-copy reveal">
          <p class="eyebrow">The part nobody else does</p>
          <h2 class="h-lower">
            it notices before you<br />
            <span class="italic">say anything.</span>
          </h2>
          <p class="lede">
            Three steps, in order, every time. The third one is the reason people trust
            this feature instead of fearing it.
          </p>

          <ol class="steps">
            <li v-for="s in steps" :key="s.n">
              <span class="step-n" aria-hidden="true">{{ s.n }}</span>
              <div>
                <h3>{{ s.title }} <span class="badge">{{ s.tag }}</span></h3>
                <p class="small">{{ s.body }}</p>
              </div>
            </li>
          </ol>

          <p class="thread-note">
            <strong>There is no fourth option where Tama sends it anyway.</strong>
            No endpoint exists that can notify someone without your recorded approval
            first — enforced in the architecture, not just hidden in the interface.
          </p>
        </div>

        <!-- The product artefact itself, framed as a device -->
        <div class="reveal" style="--reveal-delay: 90ms">
          <div class="device">
            <div class="device-bar" aria-hidden="true">
              <span />
            </div>
            <div class="device-screen">
              <p class="bubble bubble-companion">
                Tonight felt heavy. Want me to let Jane know you could use her?
              </p>

              <div class="review-card">
                <p class="review-head">Message to Jane — review before sending</p>
                <p class="review-body">
                  “Hey, just a heads up — I have had a rough night. Not urgent, but I
                  would love to hear from you when you can.”
                </p>
                <div class="review-actions">
                  <span class="ra ra-approve"><Icon name="check" />Approve</span>
                  <span class="ra ra-edit"><Icon name="pencil" />Edit</span>
                  <span class="ra ra-decline"><Icon name="x" />Decline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================ FEATURES ======== -->
    <section id="features" class="section band band-cream">
      <div class="wrap">
        <header class="sec-head center reveal">
          <p class="eyebrow center-eyebrow">Six things it does</p>
          <h2 class="h-lower">and that is the <span class="italic">whole list.</span></h2>
          <p class="lede center-lede">
            We would rather under-promise and fully deliver. This is the complete v1
            feature set — no roadmap items dressed up as shipped ones.
          </p>
        </header>

        <div class="grid g-3">
          <article
            v-for="(f, i) in FEATURES"
            :key="f.slug"
            class="page-card reveal"
            :style="{ '--reveal-delay': `${i * 55}ms` }"
          >
            <div class="chip-icon" aria-hidden="true"><Icon :name="f.icon" /></div>
            <span class="badge" :class="i === 2 || i === 4 ? 'badge-warm' : ''">
              {{ f.badge }}
            </span>
            <h3>{{ f.title }}</h3>
            <p class="muted small">{{ f.short }}</p>
            <NuxtLink :to="`/features#${f.slug}`" class="card-link">
              Read more<Icon name="arrow-right" />
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- ================================================ LIFEBOOK ========
         Row 3: back to copy left, art right. -->
    <section class="section band band-white seam-top">
      <div class="wrap zig">
        <div class="zig-copy reveal">
          <p class="eyebrow">The Lifebook</p>
          <h2 class="h-lower">
            you never have to journal.<br />
            you just <span class="italic">talk.</span>
          </h2>
          <p class="lede">
            At the end of each day, Tama writes the entry for you — in its own narrative
            voice, about your actual life. Those entries stack up into a real book: a
            stitched spine, dog-eared corners, and pages that turn.
          </p>
          <ul class="ticks">
            <li>Written from your conversations, not from a form you filled in</li>
            <li>The first page unlocks after 30 days — earned, not generated</li>
            <li>Monthly and yearly recaps woven from your own months</li>
            <li>Every entry stays exportable, on every tier, forever</li>
          </ul>
          <NuxtLink to="/lifebook" class="btn btn-ink">Look inside the Lifebook</NuxtLink>
        </div>

        <div class="reveal" style="--reveal-delay: 100ms">
          <div class="shot">
            <img
              src="/images/tama_open_lifebook.png"
              alt="An open journal titled Lifebook on a sunlit wooden desk, filled with handwritten notes, small illustrations of Tama, and polaroid photographs, beside a steaming mug and a fountain pen."
              width="1200"
              height="896"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================== PRINCIPLES ======== -->
    <section class="section band band-warm">
      <StarScatter field="sparse" />

      <div class="wrap">
        <header class="sec-head center reveal">
          <p class="eyebrow center-eyebrow">Our promises</p>
          <h2 class="h-lower">
            six rules we wrote down before we wrote any <span class="italic">code</span>
          </h2>
          <p class="lede center-lede">
            These are not marketing lines — they are product constraints. Any feature that
            breaks one does not ship.
          </p>
        </header>

        <div class="grid g-3">
          <article
            v-for="(p, i) in PRINCIPLES"
            :key="p.title"
            class="promise reveal"
            :style="{ '--reveal-delay': `${i * 50}ms` }"
          >
            <span class="promise-icon" aria-hidden="true"><Icon :name="p.icon" /></span>
            <div>
              <h3>{{ p.title }}</h3>
              <p class="muted small">{{ p.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================================================= PRIVACY ========
         Row 4: flipped again, closing the alternation. -->
    <section class="section band band-cream">
      <div class="wrap zig zig-flip">
        <div class="zig-copy reveal">
          <p class="eyebrow">Honest privacy</p>
          <h2 class="h-lower">what we <span class="italic">will not</span> tell you</h2>
          <p class="lede">
            We will never claim “nothing leaves your device.” Writing you a thoughtful
            reply genuinely requires sending your message to a language model. Pretending
            otherwise would be a lie, and a lie is a strange foundation for an app about
            trust.
          </p>
          <p><strong>Here is what is actually true instead:</strong></p>
          <ul class="ticks">
            <li v-for="t in privacyTruths" :key="t">{{ t }}</li>
          </ul>
          <div class="btn-row">
            <NuxtLink to="/data-safety" class="btn btn-ink">Full data disclosure</NuxtLink>
            <NuxtLink to="/privacy" class="btn btn-ghost">Privacy policy</NuxtLink>
          </div>
        </div>

        <div class="reveal" style="--reveal-delay: 100ms">
          <div class="shot">
            <img
              src="/images/tama_cozy_night.png"
              alt="Tama dozing peacefully on a windowsill at night beside a warm lantern and a steaming mug, with a city skyline and falling snow outside the window."
              width="1200"
              height="896"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================================================== FAQ ======== -->
    <section class="section band band-white seam-top">
      <div class="wrap wrap-narrow">
        <header class="sec-head center reveal">
          <p class="eyebrow center-eyebrow">Straight answers</p>
          <h2 class="h-lower">questions people ask first</h2>
        </header>

        <div class="faq-list">
          <details
            v-for="(f, i) in FAQS.slice(0, 6)"
            :key="f.q"
            class="faq-item reveal"
            :style="{ '--reveal-delay': `${i * 40}ms` }"
          >
            <summary>
              <span>{{ f.q }}</span>
              <span class="marker" aria-hidden="true" />
            </summary>
            <div class="faq-body">
              <p>{{ f.a }}</p>
            </div>
          </details>
        </div>

        <p class="faq-more">
          <NuxtLink to="/support" class="btn-text">
            all questions and support options<Icon name="arrow-right" />
          </NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* ============================================================================
   HERO — centred display copy with a layered art stage beneath it, the shape
   discord.com uses on its landing page.
   ========================================================================= */
.hero {
  overflow: hidden;
  padding-block: clamp(2.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 4rem);
  background:
    radial-gradient(70% 55% at 78% 4%, var(--tama-warmth-soft) 0%, transparent 60%),
    radial-gradient(60% 50% at 8% 88%, var(--tama-calm-soft) 0%, transparent 62%),
    var(--tama-bg);
}

.hero-glow {
  position: absolute;
  top: -22%;
  left: 50%;
  translate: -50% 0;
  width: min(52rem, 130vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tama-peach-glow) 0%, transparent 64%);
  opacity: 0.45;
  filter: blur(30px);
  animation: drift 19s ease-in-out infinite;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-copy {
  max-width: 46rem;
  margin-inline: auto;
}

.hero-lede {
  max-width: 40ch;
}

.hero-actions {
  margin: 1.9rem 0 1.5rem;
}

/* ------------------------------------------------------------ art stage --- */
.stage {
  position: relative;
  display: grid;
  place-items: center;
  max-width: 62rem;
  margin: clamp(2.5rem, 6vw, 4.5rem) auto 0;
  padding-inline: clamp(0rem, 6vw, 5rem);
}

.halo {
  position: absolute;
  width: min(30rem, 74%);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tama-warmth-soft) 0%, transparent 70%);
  animation: halo-pulse 5.5s ease-in-out infinite;
  pointer-events: none;
}

/* The mascot is a transparent 3D render now, so the old rounded-rectangle card
   treatment is gone — it would have drawn a box around empty space. Its
   grounding shadow comes from model-viewer's own contact shadow instead. */
.mascot {
  position: relative;
  width: min(100%, 21rem);
}

/* Floating product artefacts */
.fl {
  position: absolute;
  margin: 0;
  max-width: 16.5rem;
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: 18px 18px 18px 5px;
  padding: 0.9rem 1.05rem;
  box-shadow: 0 22px 50px -22px rgba(58, 46, 66, 0.4);
  animation: float-soft 9s ease-in-out infinite;
}

.fl blockquote {
  margin: 0 0 0.4rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--tama-ink);
}

.fl figcaption {
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--tama-ink-soft);
}

.fl figcaption :deep(.icon) {
  width: 1.15em;
  height: 1.15em;
  color: var(--tama-warmth-deep);
}

.fl-a {
  top: 4%;
  left: 0;
  animation-delay: -1.5s;
}

.fl-b {
  top: 34%;
  right: 0;
  border-radius: 18px 18px 5px 18px;
  animation-delay: -5s;
}

.fl-c {
  bottom: 2%;
  left: 4%;
  max-width: 18rem;
  border-radius: 18px;
  background: color-mix(in srgb, var(--tama-premium-soft) 55%, #fff);
  border-color: color-mix(in srgb, var(--tama-premium-gold) 26%, transparent);
  animation-delay: -3s;
}

.fl-date {
  margin: 0 0 0.3rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  color: #8a6212;
}

.fl-c blockquote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.84rem;
}

/* ============================================================================
   SIGNATURE — device frame holding the consent flow
   ========================================================================= */
.sig-inner {
  position: relative;
  z-index: 1;
}

.device {
  max-width: 24rem;
  margin-inline: auto;
  padding: 0.6rem;
  border-radius: 34px;
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-shadow: var(--shadow-deep);
}

.device-bar {
  display: grid;
  place-items: center;
  height: 1.5rem;
}

.device-bar span {
  display: block;
  width: 4.5rem;
  height: 5px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.3);
}

.device-screen {
  display: grid;
  gap: 0.85rem;
  padding: 1rem 0.9rem 1.2rem;
  border-radius: 28px;
  background: var(--tama-bg);
}

.review-card {
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-page);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-page);
  color: var(--tama-ink);
}

.review-head {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tama-ink-soft);
  margin-bottom: 0.7rem;
}

.review-body {
  font-size: 0.9rem;
  line-height: 1.55;
  background: var(--tama-bg);
  border: 1px solid var(--tama-hairline);
  border-radius: 12px;
  padding: 0.8rem 0.95rem;
  margin-bottom: 0.9rem;
}

.review-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ra {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: var(--r-pill);
}

.ra :deep(.icon) {
  width: 1.05em;
  height: 1.05em;
}

.ra-approve {
  background: var(--tama-calm);
  color: #fff;
}

.ra-edit {
  background: var(--tama-calm-soft);
  color: #43684f;
}

.ra-decline {
  background: transparent;
  color: var(--tama-ink-soft);
  border: 1px solid var(--tama-hairline);
}

/* ------------------------------------------------------------ the steps --- */
.steps {
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 1.5rem;
  display: grid;
  gap: 1.1rem;
  counter-reset: none;
}

.steps li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-n {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 12px;
  background: rgba(255, 217, 179, 0.16);
  border: 1px solid rgba(255, 217, 179, 0.3);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--tama-peach-glow);
  line-height: 1;
}

.steps h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: 0.3em;
}

.steps p {
  margin: 0;
  color: var(--on-night-soft);
}

.thread-note {
  font-size: var(--step--1);
  line-height: 1.6;
  color: var(--on-night-soft);
  border-left: 2px solid var(--tama-peach-glow);
  padding-left: 1rem;
  margin: 0;
}

.thread-note strong {
  color: #fff;
}

/* ============================================================================
   FEATURE CARDS
   ========================================================================= */
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  margin-top: 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--tama-warmth-deep);
  text-decoration: none;
}

.card-link :deep(.icon) {
  width: 1.1em;
  height: 1.1em;
  transition: transform 0.26s var(--ease-out);
}

.page-card:hover .card-link :deep(.icon) {
  transform: translateX(3px);
}

.card-link:hover {
  text-decoration: underline;
}

/* ============================================================================
   PROMISES
   ========================================================================= */
.promise {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.4rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: var(--r-card);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out),
    background 0.3s var(--ease-soft);
}

.promise:hover {
  transform: translateY(-4px);
  background: #fff;
  box-shadow: var(--shadow-lift);
}

.promise-icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: var(--tama-calm-soft);
  color: var(--tama-calm-deep);
  transition: transform 0.34s var(--ease-spring), background 0.3s var(--ease-soft);
}

.promise-icon :deep(.icon) {
  width: 22px;
  height: 22px;
}

.promise:hover .promise-icon {
  transform: rotate(-8deg) scale(1.08);
}

.promise h3 {
  font-size: 1.02rem;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: 0.35em;
}

.promise p:last-child {
  margin-bottom: 0;
}

/* ============================================================================
   FAQ
   ========================================================================= */
.faq-more {
  margin: 1.4rem 0 0;
  text-align: center;
}

/* ============================================================================
   BREAKPOINTS
   ========================================================================= */
/* Below the layered-stage breakpoint the floating cards drop into normal flow
   so nothing overlaps the mascot on a narrow screen. */
@media (max-width: 899px) {
  .stage {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    justify-items: center;
  }

  .halo {
    top: 0;
  }

  .fl {
    position: static;
    max-width: 26rem;
    width: 100%;
    animation: none;
  }

  .fl-c {
    left: auto;
  }
}

@media (min-width: 900px) {
  .stage {
    padding-block: 2rem 1rem;
  }

  .mascot {
    width: min(100%, 23rem);
  }
}

@media (min-width: 1100px) {
  .fl-a {
    left: 2%;
  }

  .fl-b {
    right: 2%;
  }
}
</style>
