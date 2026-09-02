<script setup lang="ts">
useTamaSeo({
  title: 'Page Not Found — Tama AI',
  description: 'The page you are looking for does not exist. Tama is probably napping.',
  path: '/404',
})
</script>

<template>
  <div class="not-found dark-band">
    <div class="wrap inner">
      <img
        src="/images/tama_sleeping_clouds.svg"
        alt="Tama asleep on a cloud beneath a starry purple sky."
        width="600"
        height="448"
        class="art"
        loading="eager"
        decoding="async"
      />

      <div class="copy">
        <p class="code" aria-hidden="true">404</p>
        <h1>Tama is napping here</h1>
        <p class="lede">
          The page you are looking for does not exist — or it has been moved. Either way,
          Tama is probably dozing peacefully somewhere it should not be.
        </p>
        <div class="btn-row">
          <NuxtLink to="/" class="btn btn-primary">Go home</NuxtLink>
          <NuxtLink to="/support" class="btn btn-ghost">Get help</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: calc(100dvh - 68px);
  display: grid;
  place-items: center;
  padding-block: clamp(3rem, 7vw, 6rem);
}

.inner {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  text-align: center;
}

.art {
  border-radius: 22px;
  box-shadow: var(--shadow-deep);
  border: 1px solid rgba(255, 255, 255, 0.16);
  max-width: 20rem;
  margin-inline: auto;
}

.code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 700;
  line-height: 1;
  color: var(--tama-peach-glow);
  opacity: 0.4;
  margin: 0 0 0.2em;
}

h1 {
  font-size: var(--step-3);
  max-width: 20ch;
  margin-inline: auto;
}

.lede {
  max-width: 42ch;
  margin-inline: auto;
  margin-bottom: 1.8rem;
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
}

@media (min-width: 800px) {
  .inner {
    grid-template-columns: 0.45fr 0.55fr;
    text-align: left;
  }

  h1,
  .lede {
    margin-inline: 0;
  }

  .btn-row {
    justify-content: flex-start;
  }
}
</style>
