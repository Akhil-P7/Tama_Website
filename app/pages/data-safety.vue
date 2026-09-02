<script setup lang="ts">
useTamaSeo({
  title: 'Data Safety Summary',
  description:
    'A clear, visual summary of what data Tama collects, what it does not collect, how it is stored, and how to delete it. Google Play data safety disclosure.',
  path: '/data-safety',
  breadcrumbs: [{ name: 'Data Safety', path: '/data-safety' }],
})

const collected = [
  {
    icon: 'mail',
    label: 'Email & name',
    reason: 'Authentication and to address you',
    encrypted: true,
    deletable: true,
  },
  {
    icon: 'chat',
    label: 'Conversations',
    reason: 'To produce contextual replies',
    encrypted: true,
    deletable: true,
  },
  {
    icon: 'brain',
    label: 'Memory graph',
    reason: 'Active memory recall',
    encrypted: true,
    deletable: true,
  },
  {
    icon: 'book',
    label: 'Journal entries',
    reason: 'Lifebook and export',
    encrypted: true,
    deletable: true,
  },
  {
    icon: 'camera',
    label: 'Photos',
    reason: 'Photo moments in journal',
    encrypted: true,
    deletable: true,
  },
  {
    icon: 'chart',
    label: 'Screen-time signal',
    reason: 'Proactive check-ins (opt-in)',
    encrypted: true,
    deletable: true,
  },
] as const

const notCollected = [
  'Per-app usage (which apps you opened)',
  'Location data',
  'Contact lists or address books',
  'Advertising identifiers',
  'Biometric data',
  'Browsing history',
  'Financial information',
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Data safety"
      title="Exactly what we collect"
      lede="A visual summary of Tama's data practices. No legalese, no evasion — just a clear answer to the question 'what do you know about me?'"
    />

    <!-- ============================== collected ========================== -->
    <section class="section">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">Data we collect</p>
          <h2>Six categories, all encrypted, all deletable</h2>
        </header>

        <div class="grid g-3">
          <article
            v-for="(d, i) in collected"
            :key="d.label"
            class="page-card reveal"
            :style="{ '--reveal-delay': `${i * 55}ms` }"
          >
            <div class="chip-icon" aria-hidden="true"><Icon :name="d.icon" /></div>
            <h3>{{ d.label }}</h3>
            <p class="muted small">{{ d.reason }}</p>
            <div class="data-tags">
              <span v-if="d.encrypted" class="badge"><Icon name="lock" />Encrypted</span>
              <span v-if="d.deletable" class="badge badge-warm"
                ><Icon name="trash" />Deletable</span
              >
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== not collected ====================== -->
    <section class="section dark-band">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Data we do NOT collect</p>
          <h2>Things Tama never sees</h2>
        </header>

        <ul class="not-list">
          <li
            v-for="(item, i) in notCollected"
            :key="item"
            class="reveal"
            :style="{ '--reveal-delay': `${i * 40}ms` }"
          >
            <span class="not-x" aria-hidden="true"><Icon name="x" :size="15" /></span>
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ============================== sharing ============================ -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Third-party data sharing</h2>

        <div class="callout callout-calm">
          <p>
            <strong>Never sold.</strong> Your data is not sold to anyone, for any
            purpose, ever.
          </p>
        </div>

        <div class="callout callout-calm">
          <p>
            <strong>Never used for training.</strong> Your conversations are not used to
            train third-party AI models.
          </p>
        </div>

        <div class="callout callout-warm">
          <p>
            <strong>Honest about what moves.</strong> Producing a reply requires sending
            your message to a language-model provider. We will never claim "nothing
            leaves your device" — because that would be a lie.
          </p>
        </div>

        <div class="btn-row">
          <NuxtLink to="/privacy" class="btn btn-ink">Full privacy policy</NuxtLink>
          <NuxtLink to="/delete-account" class="btn btn-ghost"
            >Delete your data</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

/* .chip-icon is styled globally in assets/css/main.css. */

.data-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.9rem;
}

.not-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.not-list li {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: var(--step-0);
  color: rgba(233, 231, 255, 0.9);
  padding: 0.85rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.not-x {
  color: var(--tama-rose);
  flex: none;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 129, 193, 0.15);
  box-shadow: inset 0 0 0 1px rgba(255, 129, 193, 0.28);
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}
</style>
