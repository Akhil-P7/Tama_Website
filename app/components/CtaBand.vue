<script setup lang="ts">
withDefaults(
  defineProps<{
    heading?: string
    body?: string
    /** Show the secondary "how we handle your data" link. */
    privacy?: boolean
  }>(),
  {
    heading: 'Tama is coming to Google Play',
    body: 'Android first, built in the open. Care is free forever — no ads, no romantic roleplay, no paywalled memories.',
    privacy: true,
  },
)
</script>

<template>
  <section class="cta dark-band">
    <div class="wrap inner">
      <img
        src="/images/tama_sleeping_clouds.jpg"
        alt="Tama asleep on a cloud beneath a starry purple sky."
        width="1200"
        height="896"
        class="art reveal"
        loading="lazy"
        decoding="async"
      />
      <div class="copy reveal" style="--reveal-delay: 90ms">
        <p class="eyebrow">Get Tama</p>
        <h2>{{ heading }}</h2>
        <p class="lede">{{ body }}</p>
        <div class="btn-row">
          <StoreBadge />
          <NuxtLink v-if="privacy" to="/data-safety" class="btn btn-ghost">
            See exactly what we collect
          </NuxtLink>
        </div>
        <p class="tiny">
          Free to start · No advertisements at any tier · Your entries are always
          exportable
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: clamp(3.5rem, 7vw, 6rem);
}

.inner {
  display: grid;
  gap: clamp(1.8rem, 4vw, 3.5rem);
  align-items: center;
}

.art {
  border-radius: 22px;
  box-shadow: var(--shadow-deep);
  border: 1px solid rgba(255, 255, 255, 0.16);
  order: 2;
}

.copy {
  order: 1;
}

h2 {
  font-size: var(--step-3);
  max-width: 22ch;
}

.lede {
  max-width: 46ch;
}

.tiny {
  margin-top: 1.1rem;
  margin-bottom: 0;
  font-size: 0.78rem;
  color: rgba(233, 231, 255, 0.6);
}

@media (min-width: 860px) {
  .inner {
    grid-template-columns: 1fr 1fr;
  }

  .art {
    order: 1;
  }

  .copy {
    order: 2;
  }
}
</style>
