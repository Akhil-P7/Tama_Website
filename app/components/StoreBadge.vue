<script setup lang="ts">
/**
 * Google Play call-to-action.
 *
 * While APP.isLive is false this renders an honest "coming soon" state rather
 * than a dead link — a broken store link is a genuine Play policy and trust
 * problem. Flip APP.isLive to true in app/utils/siteData.ts the moment the
 * production listing goes public and every instance updates at once.
 */
</script>

<template>
  <a
    v-if="APP.isLive"
    :href="APP.playUrl"
    class="btn btn-primary store"
    rel="noopener"
  >
    <span aria-hidden="true">▶</span>
    <span class="lines">
      <em>Get it on</em>
      <strong>Google Play</strong>
    </span>
  </a>

  <span v-else class="btn store store-soon" role="text">
    <span aria-hidden="true">🌱</span>
    <span class="lines">
      <em>Coming soon to</em>
      <strong>Google Play</strong>
    </span>
  </span>
</template>

<style scoped>
.store {
  gap: 0.7rem;
  padding: 0.7rem 1.5rem;
  min-height: 56px;
  text-decoration: none;
}

.lines {
  display: grid;
  line-height: 1.15;
  text-align: left;
}

.lines em {
  font-style: normal;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.85;
}

.lines strong {
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.store-soon {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  cursor: default;
}

/* On light backgrounds the "coming soon" chip needs its own palette. */
:not(.dark-band) .store-soon {
  background: var(--tama-surface);
  border-color: var(--tama-hairline);
  color: var(--tama-ink);
}
</style>
