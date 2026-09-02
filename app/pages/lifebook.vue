<script setup lang="ts">
useTamaSeo({
  title: 'The Lifebook — Your Days, Quietly Becoming a Book',
  description:
    'Tama writes a journal entry from every conversation. Those entries stack into the Lifebook — a rendered, turnable book with a stitched spine, dog-eared corners, and page-turn animation. The first page unlocks after 30 days together.',
  path: '/lifebook',
  breadcrumbs: [{ name: 'Lifebook', path: '/lifebook' }],
})

const howItWorks = [
  {
    n: '01',
    title: 'You just talk',
    body: 'There is no journal form to fill in. You tell Tama about your day, your week, something that happened — in text or voice, whenever you feel like it.',
  },
  {
    n: '02',
    title: 'Tama writes the entry',
    body: 'At the end of each day, Tama takes every conversation and compresses it into a narrative entry — written in its own voice, about your actual life.',
  },
  {
    n: '03',
    title: 'Entries become pages',
    body: 'Each day\'s entry becomes a page in your Lifebook. Attach photos and they thread into the matching page, beside what you actually said about that day.',
  },
  {
    n: '04',
    title: 'The book reveals itself',
    body: 'After 30 days together, the first page unlocks. Monthly and yearly recaps are woven from your own months. It should feel earned, not generated.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="The Lifebook"
      title="Your days, quietly becoming a book"
      lede="You never have to journal. You just talk, and at the end of the day Tama writes the entry for you — in its own narrative voice, about your actual life."
    />

    <!-- ============================== hero image ========================= -->
    <section class="section lb-showcase">
      <div class="wrap">
        <div class="lb-hero-img reveal">
          <img
            src="/images/tama_open_lifebook.png"
            alt="An open journal titled Lifebook on a sunlit wooden desk, filled with handwritten notes, small illustrations of Tama, and polaroid photographs, beside a steaming mug and a fountain pen."
            width="1200"
            height="896"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <!-- ============================== how it works ======================= -->
    <section class="section dark-band">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">How it works</p>
          <h2>Four steps from talking to turning pages</h2>
        </header>

        <ol class="steps">
          <li
            v-for="(s, i) in howItWorks"
            :key="s.n"
            class="page-card step reveal"
            :style="{ '--reveal-delay': `${i * 80}ms` }"
          >
            <span class="step-n" aria-hidden="true">{{ s.n }}</span>
            <h3>{{ s.title }}</h3>
            <p class="small">{{ s.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============================== what's inside ====================== -->
    <section class="section">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">What's inside</p>
          <h2>A book that grows with you</h2>
        </header>

        <div class="grid g-2">
          <article class="page-card reveal">
            <div class="chip-icon" aria-hidden="true"><Icon name="book-open" /></div>
            <h3>Daily entries</h3>
            <p class="muted small">
              Every conversation auto-summarises into a journal-style day page. You never
              have to write anything — Tama does it for you, in its own narrative voice.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 60ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="camera" /></div>
            <h3>Photo moments</h3>
            <p class="muted small">
              Attach a photo to a moment and it threads into the right day page —
              alongside what you actually said about that day. A photo inside the day you
              lived is a memory.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 120ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="calendar" /></div>
            <h3>Monthly & yearly recaps</h3>
            <p class="muted small">
              At the end of each month and year, Tama weaves your days into a recap
              — written as a narrative of who you were during that time.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 180ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="download" /></div>
            <h3>Always yours, always exportable</h3>
            <p class="muted small">
              Free tier keeps every entry forever. Your entries are never deleted for
              non-payment and remain exportable regardless of tier.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== free vs pro ======================== -->
    <section class="section alt-bg">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Free vs Premium</p>
          <h2>Glimpse, not gate</h2>
          <p class="lede">
            Free tier saves every journal entry you create — forever, exportable, never
            deleted. Premium adds the rendered book view, higher-quality photos, and full
            customisation.
          </p>
        </header>

        <div class="comparison reveal">
          <div class="comp-col">
            <h3>
              <span class="badge">Free</span>
            </h3>
            <ul class="ticks">
              <li>Unlimited daily entries</li>
              <li>Always saved, always exportable</li>
              <li>Monthly photo allowance</li>
              <li>Basic journal themes</li>
            </ul>
          </div>
          <div class="comp-col comp-pro">
            <h3>
              <span class="badge badge-gold">Premium</span>
            </h3>
            <ul class="ticks">
              <li>Full rendered Lifebook view</li>
              <li>Monthly & yearly recaps</li>
              <li>Higher photo allowance & quality</li>
              <li>Full theme customisation</li>
            </ul>
          </div>
        </div>

        <p class="center-link">
          <NuxtLink to="/pricing">
            See the full plan comparison<Icon name="arrow-right" />
          </NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.lb-showcase {
  padding-block: 0 var(--section-y);
}

.lb-hero-img img {
  border-radius: 22px;
  box-shadow: var(--shadow-deep);
  border: 1px solid var(--tama-hairline);
}

.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.8rem);
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

/* .chip-icon and .ticks are styled globally in assets/css/main.css. */

.ticks {
  /* Last element in its column, so it does not need the global bottom margin. */
  margin: 1.2rem 0 0;
}

.alt-bg {
  background: var(--tama-surface);
  border-block: 1px solid var(--tama-hairline);
}

.comparison {
  display: grid;
  gap: 1.5rem;
}

.comp-col {
  padding: 1.5rem;
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-card);
  background: var(--tama-bg);
}

.comp-pro {
  border-color: color-mix(in srgb, var(--tama-premium-gold) 50%, var(--tama-hairline));
  background: color-mix(in srgb, var(--tama-premium-soft) 30%, var(--tama-bg));
}

.comp-col h3 {
  margin-bottom: 0.8rem;
}

.center-link {
  margin-top: 2rem;
  text-align: center;
  font-size: var(--step--1);
  font-weight: 600;
}

.center-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--tama-warmth);
  text-decoration: none;
}

.center-link a:hover {
  text-decoration: underline;
}

.center-link :deep(.icon) {
  width: 1.15em;
  height: 1.15em;
  transition: translate 0.24s var(--ease-out);
}

.center-link a:hover :deep(.icon) {
  translate: 4px 0;
}

@media (min-width: 640px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .comparison {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
