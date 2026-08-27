<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Close the mobile panel on navigation and restore body scroll.
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

watch(open, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="wrap bar">
      <NuxtLink to="/" class="brand" aria-label="Tama AI — home">
        <img
          src="/images/tama_mascot_avatar.jpg"
          alt=""
          width="36"
          height="36"
          class="brand-mark"
        />
        <span class="brand-text">
          <span class="brand-name">Tama</span>
          <span class="brand-sub">Your life, remembered</span>
        </span>
      </NuxtLink>

      <nav class="desk-nav" aria-label="Main">
        <NuxtLink v-for="item in NAV" :key="item.path" :to="item.path">
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="head-cta">
        <NuxtLink to="/pricing" class="btn btn-ink head-btn">See what's included</NuxtLink>
      </div>

      <button
        class="burger"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
        <span class="burger-box" :class="{ 'is-open': open }" aria-hidden="true">
          <i /><i /><i />
        </span>
      </button>
    </div>

    <Transition name="sheet">
      <div v-if="open" id="mobile-nav" class="mobile-nav">
        <nav aria-label="Mobile">
          <NuxtLink v-for="(item, i) in NAV" :key="item.path" :to="item.path"
            :style="{ '--i': i }">
            {{ item.name }}
          </NuxtLink>
          <NuxtLink to="/about" :style="{ '--i': NAV.length }">About</NuxtLink>
          <NuxtLink to="/privacy" :style="{ '--i': NAV.length + 1 }">Privacy</NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: color-mix(in srgb, var(--tama-bg) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  border-bottom: 1px solid transparent;
  transition: border-color 0.28s var(--ease-soft), box-shadow 0.28s var(--ease-soft),
    background 0.28s var(--ease-soft);
}

.site-header.is-scrolled {
  border-bottom-color: var(--tama-hairline);
  box-shadow: 0 6px 24px -18px rgba(58, 46, 66, 0.4);
}

.bar {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  min-height: 68px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  margin-right: auto;
  flex: none;
}

.brand-mark {
  border-radius: 11px;
  box-shadow: 0 4px 14px -6px rgba(8, 18, 65, 0.5);
  transition: transform 0.3s var(--ease-out);
}

.brand:hover .brand-mark {
  transform: rotate(-6deg) scale(1.06);
}

.brand-text {
  display: grid;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--tama-ink);
}

.brand-sub {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  color: var(--tama-ink-soft);
}

.desk-nav {
  display: none;
  gap: 0.35rem;
}

.desk-nav a {
  position: relative;
  padding: 0.5rem 0.8rem;
  border-radius: var(--r-pill);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--tama-ink-soft);
  transition: color 0.2s var(--ease-soft), background 0.2s var(--ease-soft);
  white-space: nowrap;
}

.desk-nav a:hover {
  color: var(--tama-ink);
  background: var(--tama-ink-05);
}

.desk-nav a.router-link-active {
  color: var(--tama-ink);
  font-weight: 600;
  background: var(--tama-warmth-soft);
}

.head-cta {
  display: none;
}

.head-btn {
  min-height: 42px;
  padding: 0.55rem 1.2rem;
  font-size: 0.85rem;
}

/* --- hamburger --- */
.burger {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--tama-hairline);
  border-radius: 12px;
  background: var(--tama-surface);
  cursor: pointer;
  flex: none;
}

.burger-box {
  display: grid;
  gap: 4.5px;
  width: 19px;
}

.burger-box i {
  display: block;
  height: 2px;
  background: var(--tama-ink);
  border-radius: 2px;
  transition: transform 0.32s var(--ease-out), opacity 0.2s var(--ease-soft);
}

.burger-box.is-open i:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.burger-box.is-open i:nth-child(2) {
  opacity: 0;
}
.burger-box.is-open i:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

.mobile-nav {
  border-top: 1px solid var(--tama-hairline);
  background: var(--tama-bg);
  padding: 0.6rem var(--gutter) 1.5rem;
  max-height: calc(100dvh - 68px);
  overflow-y: auto;
}

.mobile-nav nav {
  display: grid;
}

.mobile-nav a {
  padding: 0.95rem 0.25rem;
  border-bottom: 1px solid var(--tama-hairline);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--tama-ink);
  animation: slide-in 0.4s var(--ease-out) backwards;
  animation-delay: calc(var(--i) * 45ms);
}

.mobile-nav a:last-child {
  border-bottom: none;
}

.mobile-nav a.router-link-active {
  color: var(--tama-warmth);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.26s var(--ease-soft), transform 0.3s var(--ease-out);
  transform-origin: top;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: scaleY(0.96) translateY(-8px);
}

@media (min-width: 900px) {
  .desk-nav,
  .head-cta {
    display: flex;
    align-items: center;
  }

  .burger {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-nav a {
    animation: none;
  }
}
</style>
