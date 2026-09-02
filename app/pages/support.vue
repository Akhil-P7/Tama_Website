<script setup lang="ts">
useTamaSeo({
  title: 'Support & FAQ',
  description:
    'Get help with Tama. Find answers to common questions about memory, privacy, subscriptions, and account management. Contact Support directly at thetama.ai@gmail.com.',
  path: '/support',
  breadcrumbs: [{ name: 'Support', path: '/support' }],
  schema: [
    {
      '@type': 'FAQPage',
      '@id': 'https://usetama.me/support#faq',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Help & Support"
      title="Questions, answers, and a real inbox"
      lede="If your question is not answered below, email us directly. There is no chatbot wall, no ticket queue — just a real person reading a real inbox."
    />

    <!-- ============================== contact ============================ -->
    <section class="section">
      <div class="wrap">
        <div class="contact-grid">
          <article class="page-card reveal">
            <div class="chip-icon" aria-hidden="true"><Icon name="mail" /></div>
            <h2>Email us</h2>
            <p class="muted small">
              For questions, bug reports, feature suggestions, data deletion requests, or
              anything else.
            </p>
            <a :href="`mailto:${APP.email}`" class="btn btn-ink">{{ APP.email }}</a>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 80ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="trash" /></div>
            <h2>Delete your data</h2>
            <p class="muted small">
              Want to permanently delete your account and all associated data? Follow the
              step-by-step instructions.
            </p>
            <NuxtLink to="/delete-account" class="btn btn-ghost"
              >Deletion instructions</NuxtLink
            >
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== FAQ ================================ -->
    <section id="faq" class="section alt-bg">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Frequently asked questions</p>
          <h2>Straight answers</h2>
        </header>

        <div class="faq-list">
          <details
            v-for="(f, i) in FAQS"
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
      </div>
    </section>

    <!-- ============================== troubleshooting ==================== -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Troubleshooting</h2>

        <h3>The app is not responding</h3>
        <p>
          Try force-closing the app and reopening it. If the issue persists, check your
          internet connection — Tama needs network access to produce replies.
        </p>

        <h3>I cannot see my old conversations</h3>
        <p>
          On the free tier, Tama's active memory has a rolling ~30-day window. Your
          journal entries are always saved, but conversational recall gradually fades for
          older content. Upgrading to Premium restores unlimited memory recall.
        </p>

        <h3>How do I cancel my subscription?</h3>
        <p>
          Subscriptions are managed through Google Play. Open the Play Store → Profile →
          Payments & subscriptions → Subscriptions → find Tama → Cancel. Your premium
          features remain active until the end of the billing period.
        </p>

        <h3>How do I export my data?</h3>
        <p>
          In the app, go to Profile → Privacy & Data → Export my data. Your journal
          entries will be compiled into a downloadable file.
        </p>
      </div>
    </section>

    <CtaBand :privacy="false" />
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.85rem);
}

/* .chip-icon is styled globally in assets/css/main.css. */

.contact-grid h2 {
  font-size: var(--step-2);
}

.alt-bg {
  background: var(--tama-surface);
  border-block: 1px solid var(--tama-hairline);
}

.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
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

@media (min-width: 640px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
