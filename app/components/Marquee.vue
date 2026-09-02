<script setup lang="ts">
/**
 * Marquee — the infinite scrolling word strip discord.com runs between
 * sections, with the brand mark repeating between each word.
 *
 * The track is rendered twice. The animation slides each copy by exactly
 * -100% of its own width, so when the first copy has fully exited the second
 * is sitting precisely where the first began, and the loop is seamless. The
 * second copy is aria-hidden so assistive tech reads the list once.
 *
 * Hovering pauses the scroll (`.marquee:hover` in main.css) and
 * prefers-reduced-motion freezes it into a horizontally scrollable strip
 * rather than hiding it, because the words carry real product copy.
 */
withDefaults(
  defineProps<{
    words: readonly string[]
    /** Icon.vue name shown between words. The sprout is Tama's mark. */
    mark?: 'sprout' | 'star' | 'heart' | 'sparkle'
    /** Seconds for one full pass. Longer reads calmer. */
    duration?: number
    tone?: 'night' | 'warm' | 'ink'
  }>(),
  {
    mark: 'sprout',
    duration: 34,
    tone: 'night',
  },
)
</script>

<template>
  <div class="marquee-band" :class="`tone-${tone}`">
    <div class="marquee" :style="{ '--marquee-duration': `${duration}s` }">
      <div v-for="copy in 2" :key="copy" class="marquee-track" :aria-hidden="copy === 2">
        <span v-for="w in words" :key="`${copy}-${w}`" class="marquee-item">
          <span class="marquee-mark" aria-hidden="true"><Icon :name="mark" /></span>
          {{ w }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-band {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.tone-night {
  background: linear-gradient(
    100deg,
    var(--tama-dark-bg) 0%,
    #17206b 48%,
    var(--tama-dark-surface) 100%
  );
  color: #fff;
}

.tone-night .marquee-item {
  color: rgba(255, 255, 255, 0.92);
}

.tone-warm {
  background: linear-gradient(100deg, var(--tama-warmth) 0%, #ef9a7f 52%, #e8836b 100%);
  color: #fff;
}

.tone-ink {
  background: var(--tama-ink);
  color: #fff;
}

/* Alternate words in the accent tone so the strip reads as a rhythm rather
   than a wall of identical text. */
.marquee-item:nth-child(even) {
  color: var(--tama-peach-glow);
}

.tone-warm .marquee-item:nth-child(even) {
  color: #fff5ef;
}
</style>
