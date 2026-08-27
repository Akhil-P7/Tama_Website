<script setup lang="ts">
useTamaSeo({
  title: 'Features — Everything in Version One',
  description:
    'A complete, honest feature breakdown of Tama v1: companion chat with active memory, proactive pattern check-ins, Special People consent architecture, the Lifebook journal, and photo moments.',
  path: '/features',
  breadcrumbs: [{ name: 'Features', path: '/features' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Six things it does"
      title="Everything in version one, and nothing it cannot do"
      lede="We would rather under-promise and fully deliver. This is the complete v1 feature set — no roadmap items dressed up as shipped ones."
    />

    <!-- ============================== feature sections ==================== -->
    <section
      v-for="(f, i) in FEATURES"
      :id="f.slug"
      :key="f.slug"
      class="section feature-section"
      :class="{ alt: i % 2 === 1 }"
    >
      <div class="wrap fg" :class="{ 'fg-flip': i % 2 === 1 }">
        <div class="reveal" :style="{ '--reveal-delay': '60ms' }">
          <div class="chip-icon" aria-hidden="true">{{ f.icon }}</div>
          <span class="badge" :class="i === 2 || i === 4 ? 'badge-warm' : ''">
            {{ f.badge }}
          </span>
          <h2>{{ f.title }}</h2>
          <p class="lede">{{ f.body }}</p>
          <ul class="ticks">
            <li v-for="pt in f.points" :key="pt">{{ pt }}</li>
          </ul>
        </div>

        <!-- Visual placeholder / decorative card -->
        <div class="feature-visual reveal" :style="{ '--reveal-delay': '140ms' }">
          <div class="page-card demo-card">
            <span class="demo-icon" aria-hidden="true">{{ f.icon }}</span>
            <h3>{{ f.title }}</h3>
            <p class="muted small">{{ f.short }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== principles band ==================== -->
    <section class="section dark-band">
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
            class="page-card reveal"
            :style="{ '--reveal-delay': `${i * 50}ms` }"
          >
            <div class="chip-icon" aria-hidden="true">{{ p.icon }}</div>
            <h3>{{ p.title }}</h3>
            <p class="muted small">{{ p.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.feature-section {
  border-bottom: 1px solid var(--tama-hairline);
}

.alt {
  background: var(--tama-surface);
}

.fg {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.chip-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--tama-warmth-soft);
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 1.2rem;
}

h2 {
  font-size: var(--step-3);
  max-width: 26ch;
}

.ticks {
  list-style: none;
  padding: 0;
  margin: 1.4rem 0 0;
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

.feature-visual {
  display: grid;
  place-items: center;
}

.demo-card {
  max-width: 22rem;
  text-align: center;
}

.demo-icon {
  font-size: 2.6rem;
  margin-bottom: 1rem;
  display: block;
}

.demo-card h3 {
  font-size: var(--step-1);
}

/* Section header */
.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

@media (min-width: 860px) {
  .fg {
    grid-template-columns: 1.15fr 0.85fr;
  }

  .fg-flip {
    direction: rtl;
  }

  .fg-flip > * {
    direction: ltr;
  }
}
</style>
