<script setup lang="ts">
/**
 * Site header, modelled on discord.com's nav: a wordmark, a row of items where
 * most open a grouped mega-menu panel with a decorative illustration in the
 * corner, and a single pill CTA pinned to the right.
 *
 * Interaction rules:
 *  - Triggers are real <button>s with aria-expanded / aria-controls, so the
 *    menus work from the keyboard, not only on hover.
 *  - On pointer devices the panel also opens on hover (Discord's behaviour),
 *    with a short close delay so a diagonal mouse path to the panel does not
 *    dismiss it.
 *  - Escape closes and returns focus to the trigger.
 *  - Clicking or focusing outside closes.
 *  - Navigating closes everything and unlocks body scroll.
 */
const route = useRoute()

const scrolled = ref(false)
const openMenu = ref<string | null>(null)
const mobileOpen = ref(false)
/** Whether this device should open panels on hover. */
const canHover = ref(false)
const headerEl = ref<HTMLElement | null>(null)

let closeTimer: ReturnType<typeof setTimeout> | undefined
let hoverQuery: MediaQueryList | undefined

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function toggleMenu(name: string) {
  openMenu.value = openMenu.value === name ? null : name
}

/**
 * On a hover device the panel is already open by the time a pointer click
 * lands — `mouseenter` opened it — so a plain toggle would slam it shut again.
 * Keyboard activation of a <button> reports `detail === 0`, which is how we
 * tell the two apart and keep Enter/Space working as a real toggle.
 */
function onTriggerClick(name: string, e: MouseEvent) {
  if (canHover.value && e.detail > 0) {
    openMenu.value = name
    return
  }
  toggleMenu(name)
}

function syncHover(e: MediaQueryList | MediaQueryListEvent) {
  canHover.value = e.matches
  if (!e.matches) clearTimeout(closeTimer)
}

function openOnHover(name: string) {
  if (!canHover.value) return
  clearTimeout(closeTimer)
  openMenu.value = name
}

function closeOnLeave() {
  if (!canHover.value) return
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => (openMenu.value = null), 160)
}

/** Escape closes the open panel and hands focus back to its trigger. */
function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return

  if (openMenu.value) {
    const name = openMenu.value
    openMenu.value = null
    const trigger = headerEl.value?.querySelector<HTMLButtonElement>(
      `[data-trigger="${name}"]`,
    )
    trigger?.focus()
  } else if (mobileOpen.value) {
    mobileOpen.value = false
  }
}

/** Any pointer press or focus move outside the header dismisses the panel. */
function onOutside(e: Event) {
  if (!openMenu.value) return
  const target = e.target as Node | null
  if (target && headerEl.value?.contains(target)) return
  openMenu.value = null
}

onMounted(() => {
  onScroll()
  // Tracked rather than read once, so resizing across the breakpoint switches
  // between hover panels and tap-to-toggle without a reload.
  hoverQuery = window.matchMedia('(hover: hover) and (min-width: 1000px)')
  syncHover(hoverQuery)
  hoverQuery.addEventListener('change', syncHover)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onOutside)
  document.addEventListener('focusin', onOutside)
})

onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  hoverQuery?.removeEventListener('change', syncHover)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onOutside)
  document.removeEventListener('focusin', onOutside)
  if (import.meta.client) document.body.style.overflow = ''
})

// Close everything on navigation.
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    openMenu.value = null
  },
)

// Lock the page behind the mobile drawer.
watch(mobileOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header
    ref="headerEl"
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'is-open': !!openMenu }"
  >
    <div class="wrap wrap-wide bar">
      <NuxtLink to="/" class="brand" aria-label="Tama AI — home">
        <img
          src="/images/tama-sprout-icon-180.png"
          alt=""
          width="38"
          height="38"
          class="brand-mark"
        />
        <span class="brand-word">tama</span>
      </NuxtLink>

      <nav class="desk-nav" aria-label="Main">
        <template v-for="item in MENU" :key="item.name">
          <!-- Plain link -->
          <NuxtLink v-if="!('groups' in item)" :to="item.path" class="nav-link">
            {{ item.name }}
          </NuxtLink>

          <!-- Mega-menu -->
          <div
            v-else
            class="nav-slot"
            @mouseenter="openOnHover(item.name)"
            @mouseleave="closeOnLeave"
          >
            <button
              type="button"
              class="nav-link nav-trigger"
              :class="{ 'is-active': openMenu === item.name }"
              :data-trigger="item.name"
              :aria-expanded="openMenu === item.name"
              :aria-controls="`panel-${item.name}`"
              @click="onTriggerClick(item.name, $event)"
            >
              {{ item.name }}
              <svg class="chev" viewBox="0 0 10 6" aria-hidden="true">
                <path
                  d="M1 1l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <Transition name="drop">
              <div v-if="openMenu === item.name" :id="`panel-${item.name}`" class="panel">
                <div class="panel-cols">
                  <div v-for="g in item.groups" :key="g.heading" class="panel-col">
                    <p class="panel-head">{{ g.heading }}</p>
                    <ul>
                      <li v-for="l in g.links" :key="l.path">
                        <NuxtLink :to="l.path">
                          <strong>{{ l.name }}</strong>
                          <span>{{ l.blurb }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <img
                  :src="item.art"
                  :alt="item.artAlt"
                  class="panel-art"
                  width="240"
                  height="180"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Transition>
          </div>
        </template>
      </nav>

      <div class="bar-end">
        <a
          v-if="APP.isLive"
          :href="APP.playUrl"
          class="btn btn-ink head-btn"
          rel="noopener"
        >
          Get Tama
        </a>
        <!-- While the listing is unpublished the CTA must not pretend to be a
             download link, so it points at the plan breakdown instead. -->
        <NuxtLink v-else to="/pricing" class="btn btn-ink head-btn">
          See what's included
        </NuxtLink>
      </div>

      <button
        class="burger"
        type="button"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="sr-only">{{ mobileOpen ? 'Close menu' : 'Open menu' }}</span>
        <span class="burger-box" :class="{ 'is-open': mobileOpen }" aria-hidden="true">
          <i /><i /><i />
        </span>
      </button>
    </div>

    <!-- ------------------------------------------------------ mobile drawer -->
    <Transition name="sheet">
      <div v-if="mobileOpen" id="mobile-nav" class="mobile-nav">
        <nav aria-label="Mobile">
          <template v-for="(item, i) in MENU" :key="item.name">
            <NuxtLink
              v-if="!('groups' in item)"
              :to="item.path"
              class="m-link"
              :style="{ '--i': i }"
            >
              {{ item.name }}
            </NuxtLink>

            <details v-else class="m-group" :style="{ '--i': i }">
              <summary>
                {{ item.name }}
                <svg class="chev" viewBox="0 0 10 6" aria-hidden="true">
                  <path
                    d="M1 1l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </summary>
              <ul>
                <li v-for="l in item.groups.flatMap((g) => g.links)" :key="l.path">
                  <NuxtLink :to="l.path">{{ l.name }}</NuxtLink>
                </li>
              </ul>
            </details>
          </template>
        </nav>

        <div class="m-cta">
          <StoreBadge />
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: color-mix(in srgb, var(--tama-bg) 84%, transparent);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border-bottom: 1px solid transparent;
  transition: border-color 0.28s var(--ease-soft), box-shadow 0.28s var(--ease-soft),
    background 0.28s var(--ease-soft);
}

.site-header.is-scrolled,
.site-header.is-open {
  border-bottom-color: var(--tama-hairline);
  box-shadow: 0 6px 24px -18px rgba(58, 46, 66, 0.4);
  background: color-mix(in srgb, var(--tama-bg) 94%, transparent);
}

.bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: var(--header-h);
}

/* -------------------------------------------------------------- brand ----- */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex: none;
  margin-right: 0.5rem;
}

/* The mark is a transparent render of the 3D mascot now, so the shadow has to
   follow its silhouette — a box-shadow would outline the empty square. */
.brand-mark {
  filter: drop-shadow(0 3px 6px rgba(8, 18, 65, 0.26));
  transition: transform 0.34s var(--ease-spring);
}

.brand:hover .brand-mark {
  transform: rotate(-8deg) scale(1.1);
}

.brand-word {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  color: var(--tama-ink);
}

/* ----------------------------------------------------------- desk nav ----- */
.desk-nav {
  display: none;
  align-items: center;
  gap: 0.15rem;
  margin-inline: auto;
}

.nav-slot {
  position: relative;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.85rem;
  border: 0;
  border-radius: var(--r-pill);
  background: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  text-decoration: none;
  color: var(--tama-ink);
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.18s var(--ease-soft), background 0.18s var(--ease-soft);
}

.nav-link:hover,
.nav-trigger.is-active {
  color: var(--tama-warmth-deep);
  background: var(--tama-ink-05);
}

/* Discord marks the current section with a small underline rather than a fill */
.desk-nav a.router-link-active {
  color: var(--tama-warmth-deep);
}

.desk-nav a.router-link-active::after {
  content: '';
  position: absolute;
  inset: auto 0.85rem -2px;
  height: 2px;
  border-radius: 2px;
  background: var(--tama-warmth);
}

.desk-nav > a {
  position: relative;
}

.chev {
  width: 9px;
  height: 6px;
  flex: none;
  transition: transform 0.24s var(--ease-out);
}

.nav-trigger.is-active .chev {
  transform: rotate(180deg);
}

/* ----------------------------------------------------------- mega menu ---- */
.panel {
  position: absolute;
  top: calc(100% + 0.55rem);
  left: 50%;
  translate: -50% 0;
  z-index: 5;
  display: flex;
  gap: 1.25rem;
  width: max-content;
  max-width: min(44rem, calc(100vw - 2 * var(--gutter)));
  padding: 1.35rem 1.35rem 1.25rem;
  background: var(--tama-surface);
  border: 1px solid var(--tama-hairline);
  border-radius: 22px;
  box-shadow: 0 28px 60px -24px rgba(58, 46, 66, 0.35);
}

/* A transparent bridge across the gap, so travelling from trigger to panel
   never crosses un-hovered ground and closes the menu. */
.panel::before {
  content: '';
  position: absolute;
  inset: -0.7rem 0 100% 0;
}

.panel-cols {
  display: flex;
  gap: 1.75rem;
}

.panel-col {
  min-width: 13.5rem;
}

.panel-head {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--tama-ink-soft);
  margin: 0 0 0.6rem;
}

.panel-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.15rem;
}

.panel-col a {
  display: grid;
  gap: 0.1rem;
  padding: 0.55rem 0.65rem;
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.18s var(--ease-soft);
}

.panel-col a:hover {
  background: var(--tama-warmth-soft);
}

.panel-col strong {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--tama-ink);
  line-height: 1.35;
}

.panel-col span {
  font-size: 0.75rem;
  color: var(--tama-ink-soft);
  line-height: 1.4;
}

.panel-art {
  width: 11rem;
  height: auto;
  align-self: stretch;
  object-fit: cover;
  border-radius: 16px;
  flex: none;
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s var(--ease-soft), transform 0.24s var(--ease-out);
}

.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.985);
}

/* ------------------------------------------------------------- bar end ---- */
.bar-end {
  display: none;
  align-items: center;
  gap: 0.6rem;
  flex: none;
}

.head-btn {
  min-height: 44px;
  padding: 0.6rem 1.35rem;
  font-size: 0.85rem;
  border-width: 0;
}

/* ------------------------------------------------------------- burger ----- */
.burger {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  border: 1px solid var(--tama-hairline);
  border-radius: 13px;
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

/* ------------------------------------------------------ mobile drawer ----- */
.mobile-nav {
  border-top: 1px solid var(--tama-hairline);
  background: var(--tama-bg);
  padding: 0.5rem var(--gutter) 2rem;
  max-height: calc(100dvh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
}

.mobile-nav nav {
  display: grid;
}

.m-link,
.m-group > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0.25rem;
  border-bottom: 1px solid var(--tama-hairline);
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-transform: lowercase;
  text-decoration: none;
  color: var(--tama-ink);
  cursor: pointer;
  list-style: none;
  animation: slide-in 0.4s var(--ease-out) backwards;
  animation-delay: calc(var(--i) * 55ms);
}

.m-group > summary::-webkit-details-marker {
  display: none;
}

.m-group[open] > summary {
  color: var(--tama-warmth-deep);
  border-bottom-color: transparent;
}

.m-group[open] > summary .chev {
  transform: rotate(180deg);
}

.m-group .chev {
  width: 12px;
  height: 8px;
  color: var(--tama-ink-soft);
}

.m-group ul {
  list-style: none;
  margin: 0 0 0.5rem;
  padding: 0 0 0.75rem 0.35rem;
  border-bottom: 1px solid var(--tama-hairline);
  display: grid;
  gap: 0.1rem;
}

.m-group ul a {
  display: block;
  padding: 0.6rem 0.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--tama-ink-soft);
}

.m-group ul a:hover,
.m-group ul a.router-link-active {
  color: var(--tama-ink);
  background: var(--tama-warmth-soft);
}

.m-link.router-link-active {
  color: var(--tama-warmth-deep);
}

.m-cta {
  margin-top: 1.5rem;
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

/* -------------------------------------------------------- breakpoints ----- */
@media (min-width: 1000px) {
  .desk-nav,
  .bar-end {
    display: flex;
  }

  .burger {
    display: none;
  }
}

@media (max-width: 999px) {
  /* No hover panels below the desktop breakpoint — the drawer handles it. */
  .panel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .m-link,
  .m-group > summary {
    animation: none;
  }
}
</style>
