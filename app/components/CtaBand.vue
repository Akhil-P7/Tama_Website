<script setup lang="ts">
/**
 * Closing call-to-action, shaped like the band discord.com ends every page with:
 * centred copy, an oversized headline that comments on the fact you have run out
 * of page, and a wide illustration cropped along the bottom edge.
 *
 * `heading` / `accent` split the headline in two so the second line can be set
 * in italic display type without any page needing to pass markup.
 */
withDefaults(
  defineProps<{
    heading?: string
    accent?: string
    body?: string
    /** Show the secondary "how we handle your data" link. */
    privacy?: boolean
  }>(),
  {
    heading: 'you reached the end of the page.',
    accent: 'your Lifebook starts on page one.',
    body: 'Android first, built in the open. Care is free forever — no ads, no romantic roleplay, no paywalled memories, and every entry stays exportable whatever you pay.',
    privacy: true,
  },
)
</script>

<template>
  <section class="cta band-night">
    <StarScatter field="dense" />

    <div class="wrap inner">
      <div class="copy center reveal">
        <p class="eyebrow center-eyebrow">Get Tama</p>
        <h2 class="display display-sm">
          {{ heading }}<br />
          <span class="italic">{{ accent }}</span>
        </h2>
        <p class="lede center-lede">{{ body }}</p>

        <div class="btn-row center cta-actions">
          <StoreBadge />
          <NuxtLink v-if="privacy" to="/data-safety" class="btn btn-paper">
            See exactly what we collect
          </NuxtLink>
        </div>

        <p class="tiny">
          Free to start · No advertisements at any tier · Your entries are always
          exportable
        </p>
      </div>
    </div>

    <!-- Wide art cropped by the band's bottom edge, the way Discord signs off -->
    <div class="art-stage reveal" style="--reveal-delay: 120ms">
      <img
        src="/images/tama_sleeping_clouds.svg"
        alt="Tama asleep on a cloud beneath a starry purple sky."
        width="1200"
        height="896"
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-top: clamp(3.5rem, 7vw, 6rem);
  padding-bottom: 0;
  overflow: hidden;
}

.inner {
  position: relative;
  z-index: 1;
}

.copy {
  max-width: 44rem;
  margin-inline: auto;
}

.display-sm {
  max-width: 26ch;
  margin-inline: auto;
}

.cta-actions {
  margin: 1.8rem 0 1.2rem;
}

.tiny {
  margin-bottom: 0;
  font-size: 0.78rem;
  color: var(--on-night-faint);
}

/* ------------------------------------------------------------- art stage --- */
.art-stage {
  position: relative;
  z-index: 1;
  margin-top: clamp(2.25rem, 5vw, 3.5rem);
  /* Bleed past the wrap and crop hard on the bottom edge of the band */
  margin-bottom: calc(clamp(2rem, 5vw, 3.5rem) * -1);
  padding-inline: var(--gutter);
}

.art-stage img {
  display: block;
  width: min(100%, var(--wrap));
  margin-inline: auto;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: 50% 34%;
  border-radius: var(--r-shot) var(--r-shot) 0 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-bottom: 0;
  box-shadow: var(--shadow-deep);
}

@media (min-width: 900px) {
  .art-stage img {
    aspect-ratio: 21 / 8;
  }
}
</style>
