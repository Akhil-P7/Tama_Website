<script setup lang="ts">
/**
 * Shared hero for every interior page. Centred, on a star-scattered band, so
 * the fifteen pages that never got hand-restyled still speak the same visual
 * language as the homepage.
 *
 * Headings are lowercased in CSS rather than in the copy, so `title` stays
 * properly cased for search engines, screen readers and the document outline.
 */
defineProps<{
  eyebrow?: string
  title: string
  lede?: string
  dark?: boolean
}>()
</script>

<template>
  <section class="page-hero" :class="{ 'dark-band': dark }">
    <div v-if="!dark" class="glow" aria-hidden="true" />
    <StarScatter field="seam" />

    <div class="wrap inner center">
      <p v-if="eyebrow" class="eyebrow center-eyebrow">{{ eyebrow }}</p>
      <h1 class="display display-sm">{{ title }}</h1>
      <p v-if="lede" class="lede center-lede">{{ lede }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2.25rem, 4vw, 3.25rem);
}

.page-hero:not(.dark-band) {
  background:
    radial-gradient(80% 62% at 82% 0%, var(--tama-warmth-soft) 0%, transparent 62%),
    radial-gradient(66% 56% at 6% 16%, var(--tama-calm-soft) 0%, transparent 58%),
    var(--tama-bg);
  border-bottom: 1px solid var(--tama-hairline);
}

.glow {
  position: absolute;
  top: -40%;
  left: 50%;
  translate: -50% 0;
  width: min(40rem, 120vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--tama-peach-glow) 0%, transparent 62%);
  opacity: 0.34;
  filter: blur(26px);
  pointer-events: none;
}

.inner {
  position: relative;
  z-index: 1;
  max-width: 48rem;
  margin-inline: auto;
}

h1 {
  margin-bottom: 0.55em;
}

.lede {
  max-width: 60ch;
}

/* Slotted extras — the legal pages' effective-date block — follow the centring. */
.inner :deep(.meta) {
  margin-top: 1.1rem;
  margin-bottom: 0;
  font-size: var(--step--1);
  line-height: 1.7;
  color: var(--tama-ink-soft);
}

.page-hero.dark-band .inner :deep(.meta) {
  color: var(--on-night-soft);
}
</style>
