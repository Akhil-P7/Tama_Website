<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lede?: string
  dark?: boolean
}>()
</script>

<template>
  <section class="page-hero" :class="{ 'dark-band': dark }">
    <div class="wrap">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="lede" class="lede">{{ lede }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(2rem, 4vw, 3rem);
  position: relative;
}

.page-hero:not(.dark-band) {
  background:
    radial-gradient(90% 70% at 88% 0%, var(--tama-warmth-soft) 0%, transparent 62%),
    radial-gradient(70% 60% at 5% 10%, var(--tama-calm-soft) 0%, transparent 58%),
    var(--tama-bg);
  border-bottom: 1px solid var(--tama-hairline);
}

h1 {
  font-size: var(--step-4);
  max-width: 24ch;
  margin-bottom: 0.6em;
}

.lede {
  max-width: 66ch;
}
</style>
