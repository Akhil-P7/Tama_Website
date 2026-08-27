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
  { icon: '🚫', text: 'No ads, at any tier' },
  { icon: '💛', text: 'Care is free forever' },
  { icon: '📖', text: 'Your entries are always yours' },
  { icon: '🔒', text: 'Usage data stays on your phone' },
]

const steps = [
  {
    n: '01',
    title: 'It notices',
    body: 'You have been on your phone until 2am for three nights. Not against a universal threshold — against your own baseline from last month. The maths happens on your device.',
    tag: 'On-device',
  },
  {
    n: '02',
    title: 'It reaches out',
    body: 'Tama writes you a real message, with full context on what has been going on in your life lately. Not a canned push notification. Something a friend would actually send.',
    tag: 'Personal',
  },
  {
    n: '03',
    title: 'It asks — never assumes',
    body: 'If the night feels heavy, Tama offers to let someone you trust know. It shows you the exact draft. You approve it, rewrite it, or say no. Nothing sends on its own.',
    tag: 'Consent-gated',
  },
]
</script>

<template>
  <div>
    <!-- ================================================== HERO ========== -->
    <section class="hero">
      <div class="hero-glow" aria-hidden="true" />
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">AI companion · Android · Built for Shipaton 2026</p>
          <h1>
            Your life,
            <span class="italic">remembered.</span>
          </h1>
          <p class="lede hero-lede">
            Tama listens to your day, remembers the people in it, quietly notices when
            something feels off — and turns all of it into a book you will actually want
            to read.
          </p>

          <div class="btn-row hero-actions">
            <StoreBadge />
            <NuxtLink to="/features" class="btn btn-ghost">See how it works</NuxtLink>
          </div>

          <ul class="pills">
            <li v-for="p in trustPills" :key="p.text">
              <span aria-hidden="true">{{ p.icon }}</span> {{ p.text }}
            </li>
          </ul>
        </div>

        <div class="hero-art">
          <div class="halo" aria-hidden="true" />
          <img
            src="/images/tama_mascot_avatar.jpg"
            alt="Tama, a soft cream-coloured cloud creature with a green sprout on its head, resting its chin on its paws under a starry night sky."
            width="889"
            height="896"
            class="mascot float"
            fetchpriority="high"
            decoding="async"
          />

          <!-- Floating conversation proof, positioned around the mascot -->
          <figure class="quote quote-a">
            <blockquote>
              How did the thing with your manager end up going?
            </blockquote>
            <figcaption>Tama · Tuesday, unprompted</figcaption>
          </figure>

          <figure class="quote quote-b">
            <blockquote>
              It is later than usual and you have been on your phone a while. Everything
              okay tonight?
            </blockquote>
            <figcaption>🌙 sent quietly · 11:42 PM</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ============================================== THE PREMISE ======= -->
    <section class="section premise">
      <div class="wrap wrap-narrow center">
        <p class="eyebrow center-eyebrow">Why Tama exists</p>
        <h2 class="premise-h">
          Most AI remembers your <span class="italic">prompts.</span><br />
          Tama remembers your <span class="italic">people.</span>
        </h2>
        <p class="lede center-lede">
          A generic assistant starts from zero every time you open it. Tama does the
          opposite — it rebuilds a layered picture of your life before every single reply:
          this conversation, your last two weeks, the people you have named, and the
          moments that mattered. That is why it can bring something up four days later
          without being asked.
        </p>
      </div>
    </section>

    <!-- ================================================ FEATURES ======== -->
    <section id="features" class="section features">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">Six things it does</p>
          <h2>Everything in version one, and nothing it cannot do</h2>
          <p class="lede">
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
            <div class="chip-icon" aria-hidden="true">{{ f.icon }}</div>
            <span class="badge" :class="i === 2 || i === 4 ? 'badge-warm' : ''">
              {{ f.badge }}
            </span>
            <h3>{{ f.title }}</h3>
            <p class="muted small">{{ f.short }}</p>
            <NuxtLink :to="`/features#${f.slug}`" class="card-link">
              Read more<span aria-hidden="true"> →</span>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- ========================================= SIGNATURE MOMENT ======= -->
    <section class="section dark-band signature">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">The part nobody else does</p>
          <h2>Noticed, then asked. Never decided for you.</h2>
          <p class="lede">
            Three steps, in order, every time. The third one is the reason people trust
            this feature instead of fearing it.
          </p>
        </header>

        <ol class="steps">
          <li
            v-for="(s, i) in steps"
            :key="s.n"
            class="page-card step reveal"
            :style="{ '--reveal-delay': `${i * 90}ms` }"
          >
            <span class="step-n" aria-hidden="true">{{ s.n }}</span>
            <span class="badge">{{ s.tag }}</span>
            <h3>{{ s.title }}</h3>
            <p class="small">{{ s.body }}</p>
          </li>
        </ol>

        <!-- Consent card recreation -->
        <div class="consent-demo reveal">
          <div class="chat-thread">
            <p class="bubble bubble-companion">
              Tonight felt heavy. Want me to let Jane know you could use her?
            </p>

            <div class="review-card">
              <p class="review-head">Message to Jane — review before sending</p>
              <p class="review-body">
                “Hey, just a heads up — I have had a rough night. Not urgent, but I would
                love to hear from you when you can.”
              </p>
              <div class="review-actions">
                <span class="ra ra-approve">✓ Approve</span>
                <span class="ra ra-edit">✎ Edit</span>
                <span class="ra ra-decline">✕ Decline</span>
              </div>
            </div>

            <p class="thread-note">
              <strong>There is no fourth option where Tama sends it anyway.</strong>
              No endpoint exists that can notify someone without your recorded approval
              first — enforced in the architecture, not just hidden in the interface.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================ LIFEBOOK ======== -->
    <section class="section lifebook">
      <div class="wrap lb-grid">
        <div class="lb-art reveal">
          <img
            src="/images/tama_open_lifebook.jpg"
            alt="An open journal titled Lifebook on a sunlit wooden desk, filled with handwritten notes, small illustrations of Tama, and polaroid photographs, beside a steaming mug and a fountain pen."
            width="1200"
            height="896"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="lb-copy reveal" style="--reveal-delay: 100ms">
          <p class="eyebrow">The Lifebook</p>
          <h2>You never have to journal. You just talk.</h2>
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
      </div>
    </section>

    <!-- ============================================== PRINCIPLES ======== -->
    <section class="section principles">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">Our promises</p>
          <h2>Six rules we wrote down before we wrote any code</h2>
          <p class="lede">
            These are not marketing lines — they are product constraints. Every feature
            decision gets checked against them, and any feature that breaks one does not
            ship.
          </p>
        </header>

        <div class="grid g-3">
          <article
            v-for="(p, i) in PRINCIPLES"
            :key="p.title"
            class="promise reveal"
            :style="{ '--reveal-delay': `${i * 50}ms` }"
          >
            <span class="promise-icon" aria-hidden="true">{{ p.icon }}</span>
            <div>
              <h3>{{ p.title }}</h3>
              <p class="muted small">{{ p.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ================================================= PRIVACY ======== -->
    <section class="section privacy-band">
      <div class="wrap pv-grid">
        <div class="reveal">
          <p class="eyebrow">Honest privacy</p>
          <h2>What we will not tell you</h2>
          <p class="lede">
            We will never claim “nothing leaves your device.” Writing you a thoughtful
            reply genuinely requires sending your message to a language model. Pretending
            otherwise would be a lie, and a lie is a strange foundation for an app about
            trust.
          </p>
          <p>Here is what is actually true instead:</p>
          <ul class="ticks">
            <li>Your raw screen-time log never leaves your phone — only a signal like “deviation detected” does</li>
            <li>Data is encrypted in transit and at rest</li>
            <li>Never sold. Never used to train third-party models.</li>
            <li>One-tap deletion that removes real rows and real files, not a hidden flag</li>
            <li>No advertising identifiers, because there is no advertising</li>
          </ul>
          <div class="btn-row">
            <NuxtLink to="/data-safety" class="btn btn-ink">Full data disclosure</NuxtLink>
            <NuxtLink to="/privacy" class="btn btn-ghost">Privacy policy</NuxtLink>
          </div>
        </div>
        <div class="pv-art reveal" style="--reveal-delay: 100ms">
          <img
            src="/images/tama_cozy_night.jpg"
            alt="Tama dozing peacefully on a windowsill at night beside a warm lantern and a steaming mug, with a city skyline and falling snow outside the window."
            width="1200"
            height="896"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- ===================================================== FAQ ======== -->
    <section class="section faq">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Straight answers</p>
          <h2>Questions people ask first</h2>
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
          <NuxtLink to="/support">All questions and support options →</NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* ------------------------------------------------------------- hero ----- */
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(2.5rem, 6vw, 5rem) clamp(3rem, 7vw, 6rem);
  background:
    radial-gradient(80% 60% at 78% 6%, var(--tama-warmth-soft) 0%, transparent 60%),
    radial-gradient(70% 55% at 8% 82%, var(--tama-calm-soft) 0%, transparent 62%),
    var(--tama-bg);
}

.hero-glow {
  position: absolute;
  top: -18%;
  right: -12%;
  width: 46rem;
  height: 46rem;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tama-peach-glow) 0%, transparent 66%);
  opacity: 0.5;
  filter: blur(28px);
  animation: drift 17s ease-in-out infinite;
  pointer-events: none;
}

.hero-grid {
  position: relative;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  align-items: center;
}

h1 {
  margin-bottom: 0.4em;
}

.italic {
  font-style: italic;
  font-weight: 400;
  color: var(--tama-warmth);
}

.hero-lede {
  max-width: 48ch;
  font-size: var(--step-1);
}

.hero-actions {
  margin: 1.9rem 0 1.6rem;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pills li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--tama-ink);
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-pill);
  padding: 0.38rem 0.85rem;
}

/* hero art */
.hero-art {
  position: relative;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 2.5rem);
}

.halo {
  position: absolute;
  inset: 12% 12% 12% 12%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tama-warmth-soft) 0%, transparent 70%);
  animation: halo-pulse 5.5s ease-in-out infinite;
  pointer-events: none;
}

.mascot {
  position: relative;
  width: min(100%, 23rem);
  border-radius: 30px;
  box-shadow: 0 32px 70px -30px rgba(8, 18, 65, 0.6);
}

.quote {
  position: absolute;
  margin: 0;
  max-width: 15.5rem;
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: 16px 16px 16px 4px;
  padding: 0.85rem 1rem;
  box-shadow: var(--shadow-lift);
  animation: float-soft 9s ease-in-out infinite;
}

.quote blockquote {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--tama-ink);
}

.quote figcaption {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--tama-ink-soft);
}

.quote-a {
  top: 2%;
  left: -3%;
  animation-delay: -1.5s;
}

.quote-b {
  bottom: 1%;
  right: -4%;
  animation-delay: -5s;
  border-radius: 16px 16px 4px 16px;
}

/* ---------------------------------------------------------- premise ----- */
.premise {
  background: var(--tama-surface);
  border-block: 1px solid var(--tama-hairline);
}

.center {
  text-align: center;
}

.center-eyebrow {
  justify-content: center;
}

.premise-h {
  font-size: var(--step-3);
  margin-inline: auto;
  max-width: 30ch;
}

.center-lede {
  margin-inline: auto;
}

/* --------------------------------------------------------- sections ----- */
.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

.card-link {
  display: inline-block;
  margin-top: 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--tama-warmth);
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

.page-card .badge {
  margin-bottom: 0.8rem;
}

/* -------------------------------------------------------- signature ----- */
.steps {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.8rem);
  counter-reset: none;
}

.step {
  position: relative;
  padding-top: 2.6rem;
}

.step-n {
  position: absolute;
  top: 1.15rem;
  left: clamp(1.4rem, 2.6vw, 2.1rem);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--tama-peach-glow);
  opacity: 0.75;
  line-height: 1;
}

.step h3 {
  font-size: var(--step-1);
}

.consent-demo {
  max-width: 34rem;
  margin-inline: auto;
}

.chat-thread {
  display: grid;
  gap: 0.85rem;
}

.review-card {
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-page);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-deep);
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
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: var(--r-pill);
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

.thread-note {
  font-size: var(--step--1);
  line-height: 1.6;
  color: rgba(233, 231, 255, 0.78);
  border-left: 2px solid var(--tama-peach-glow);
  padding-left: 1rem;
  margin: 0.5rem 0 0;
}

.thread-note strong {
  color: #fff;
}

/* --------------------------------------------------------- lifebook ----- */
.lifebook {
  background: var(--tama-surface);
  border-block: 1px solid var(--tama-hairline);
}

.lb-grid,
.pv-grid {
  display: grid;
  gap: clamp(2rem, 4.5vw, 3.5rem);
  align-items: center;
}

.lb-art img,
.pv-art img {
  border-radius: 22px;
  box-shadow: var(--shadow-lift);
  border: 1px solid var(--tama-hairline);
}

.lb-copy h2 {
  font-size: var(--step-3);
}

.ticks {
  list-style: none;
  padding: 0;
  margin: 1.4rem 0 1.8rem;
  display: grid;
  gap: 0.6rem;
}

.ticks li {
  position: relative;
  padding-left: 1.75rem;
  font-size: var(--step--1);
  color: var(--tama-ink-soft);
}

.ticks li::before {
  content: '🌱';
  position: absolute;
  left: 0;
  top: -0.05em;
  font-size: 0.9rem;
}

/* -------------------------------------------------------- principles ---- */
.promise {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.35rem;
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-card);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
}

.promise:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}

.promise-icon {
  font-size: 1.4rem;
  line-height: 1;
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--tama-calm-soft);
}

.promise h3 {
  font-size: 1.02rem;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: 0.35em;
}

/* ---------------------------------------------------------- privacy ----- */
.privacy-band {
  background:
    radial-gradient(70% 60% at 92% 12%, var(--tama-calm-soft) 0%, transparent 62%),
    var(--tama-bg);
}

.privacy-band h2 {
  font-size: var(--step-3);
}

/* -------------------------------------------------------------- faq ----- */
.faq {
  background: var(--tama-surface);
  border-top: 1px solid var(--tama-hairline);
}

.faq-list {
  display: grid;
  gap: 0.65rem;
}

.faq-item {
  border: 1px solid var(--tama-hairline);
  border-radius: 14px;
  background: var(--tama-bg);
  overflow: hidden;
  transition: border-color 0.24s var(--ease-soft), box-shadow 0.24s var(--ease-soft);
}

.faq-item[open] {
  border-color: color-mix(in srgb, var(--tama-warmth) 45%, var(--tama-hairline));
  box-shadow: var(--shadow-page);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.05rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.marker {
  position: relative;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--tama-warmth-soft);
  transition: transform 0.3s var(--ease-out), background 0.24s var(--ease-soft);
}

.marker::before,
.marker::after {
  content: '';
  position: absolute;
  inset: 50% 25%;
  height: 2px;
  translate: 0 -1px;
  background: #a8503a;
  border-radius: 2px;
  transition: opacity 0.24s var(--ease-soft);
}

.marker::after {
  rotate: 90deg;
}

.faq-item[open] .marker {
  transform: rotate(135deg);
  background: var(--tama-warmth);
}

.faq-item[open] .marker::before,
.faq-item[open] .marker::after {
  background: #fff;
}

.faq-body {
  padding: 0 1.2rem 1.2rem;
}

.faq-body p {
  margin: 0;
  font-size: var(--step--1);
  color: var(--tama-ink-soft);
  line-height: 1.68;
  max-width: 68ch;
}

.faq-more {
  margin: 1.6rem 0 0;
  font-size: var(--step--1);
  font-weight: 600;
}

.faq-more a {
  color: var(--tama-warmth);
  text-decoration: none;
}

.faq-more a:hover {
  text-decoration: underline;
}

/* ------------------------------------------------------ breakpoints ----- */
@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.08fr 0.92fr;
  }

  .steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .lb-grid {
    grid-template-columns: 1fr 1fr;
  }

  .pv-grid {
    grid-template-columns: 1.05fr 0.95fr;
  }
}

@media (max-width: 560px) {
  .quote-a,
  .quote-b {
    position: static;
    max-width: none;
    margin-top: 0.85rem;
    animation: none;
  }

  .hero-art {
    padding-inline: 0;
  }
}
</style>
