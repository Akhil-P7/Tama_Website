<script setup lang="ts">
useTamaSeo({
  title: 'Updates & Changelog',
  description:
    'Tama release notes and changelog. Track every version, feature addition, and improvement from v1.0 onward.',
  path: '/updates',
  breadcrumbs: [{ name: 'Updates', path: '/updates' }],
})

const releases = [
  {
    version: '1.0',
    date: 'September 2026',
    badge: 'Launch',
    badgeClass: 'badge-warm',
    summary: 'Initial release — built for RevenueCat Shipaton 2026.',
    changes: [
      'Companion chat with four-layer active memory recall',
      'Proactive pattern check-ins with on-device screen-time analysis',
      'Special People with consent-first notification architecture',
      'Lifebook — auto-generated journal entries from conversations',
      'Photo moments attached to day pages',
      'Voice onboarding with text-only fallback',
      'Free and Premium tiers via Google Play + RevenueCat',
      'Full privacy policy, terms of service, and data safety disclosure',
    ],
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Changelog"
      title="Updates & release notes"
      lede="Every version, every change, documented honestly. No stealth updates, no hidden removals."
    />

    <section class="section">
      <div class="wrap wrap-narrow">
        <ol class="timeline">
          <li
            v-for="(r, i) in releases"
            :key="r.version"
            class="release reveal"
            :style="{ '--reveal-delay': `${i * 80}ms` }"
          >
            <div class="release-head">
              <div class="release-meta">
                <span class="version">v{{ r.version }}</span>
                <span class="release-date">{{ r.date }}</span>
              </div>
              <span class="badge" :class="r.badgeClass">{{ r.badge }}</span>
            </div>

            <div class="page-card release-body">
              <p class="release-summary">{{ r.summary }}</p>
              <ul class="changes">
                <li v-for="c in r.changes" :key="c">{{ c }}</li>
              </ul>
            </div>
          </li>
        </ol>

        <div class="coming-soon reveal">
          <div class="page-card">
            <p class="eyebrow">What's next</p>
            <p class="muted small">
              Tama is actively being developed. Future updates will appear here as they
              ship. Follow the project or reach out at
              <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 2rem;
}

.release-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.release-meta {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.version {
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-weight: 600;
  color: var(--tama-ink);
}

.release-date {
  font-size: var(--step--1);
  color: var(--tama-ink-soft);
}

.release-summary {
  font-weight: 600;
  color: var(--tama-ink);
  margin-bottom: 1rem;
}

.changes {
  padding-left: 1.3rem;
  margin: 0;
  display: grid;
  gap: 0.45rem;
}

.changes li {
  font-size: var(--step--1);
  color: var(--tama-ink-soft);
}

.changes li::marker {
  color: var(--tama-warmth);
}

.coming-soon {
  margin-top: 2.5rem;
}
</style>
