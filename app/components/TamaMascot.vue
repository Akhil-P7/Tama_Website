<script setup lang="ts">
/**
 * Tama's mascot, as the real 3D model rather than a flat render.
 *
 * Three things make this safe to put on a marketing homepage:
 *
 *  1. **The prerendered HTML contains a real `<img>`.** `ready` can only flip
 *     inside `onMounted`, so during SSR and prerendering the `<model-viewer>`
 *     branch is never taken and the `<img>` branch always is. Crawlers,
 *     GPTBot/ClaudeBot and no-JS visitors receive a normal image with normal
 *     alt text — exactly one of them, which is why there is no `<ClientOnly>`
 *     fallback here duplicating it.
 *
 *  2. **The 3D engine is fetched only when the mascot is about to be seen.**
 *     `@google/model-viewer` is ~350 KB; importing it eagerly would block the
 *     hero for no reason. An IntersectionObserver with a generous rootMargin
 *     starts the import slightly before the element scrolls in, so by the time
 *     it is on screen the model is usually already there. Note that a browser
 *     only delivers IntersectionObserver callbacks while it is actually
 *     rendering the page — in a hidden or background tab nothing loads until
 *     the visitor comes back to it, which is the behaviour we want and not a
 *     bug, however much it looks like one in a headless preview.
 *
 *  3. **The same image is the poster.** There is no empty box and no layout
 *     shift while the model loads — the `<img>` hands over to a `<model-viewer>`
 *     whose `poster` is that same file, so the swap is invisible and you simply
 *     see the flat mascot quietly become dimensional.
 *
 * Scroll behaviour is deliberately conservative: zoom and pan are off and
 * `touch-action="pan-y"` is set, so dragging vertically on a phone scrolls the
 * page as expected instead of spinning the model and trapping the visitor.
 */
const props = withDefaults(
  defineProps<{
    /** hero = large and draggable; mark = small, static, decorative. */
    variant?: 'hero' | 'mark'
    alt?: string
    /** Let the visitor rotate it. Off for the small marks. */
    interactive?: boolean
    /** Poster / no-JS fallback image. */
    poster?: string
    class?: string
  }>(),
  {
    variant: 'hero',
    alt: 'Tama, a small round cream-coloured companion with a green sprout growing from its head.',
    poster: '/images/tama-sprout-mark-512.png',
  },
)

const MODEL = '/model/tama-sprout.glb'

const host = ref<HTMLElement | null>(null)
const ready = ref(false)
/** Auto-rotate is motion; honour the OS setting rather than overriding it. */
const spin = ref(true)

let io: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined

function syncMotion(e: MediaQueryList | MediaQueryListEvent) {
  spin.value = !e.matches
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotion(motionQuery)
  motionQuery.addEventListener('change', syncMotion)

  // No IntersectionObserver (or no host yet) should never mean "no mascot" —
  // fall back to importing straight away.
  if (!('IntersectionObserver' in window) || !host.value) {
    void load()
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      void load()
    },
    { rootMargin: '400px' },
  )
  io.observe(host.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  motionQuery?.removeEventListener('change', syncMotion)
})

async function load() {
  try {
    await import('@google/model-viewer')
    ready.value = true
  } catch (err) {
    // Leave the poster in place. A failed 3D import is a cosmetic downgrade,
    // not a broken page — but it should never fail silently while developing.
    ready.value = false
    if (import.meta.dev) console.warn('[TamaMascot] 3D import failed:', err)
  }
}
</script>

<template>
  <div ref="host" class="mascot-3d" :class="[`is-${variant}`, props.class]">
    <model-viewer
      v-if="ready"
      :src="MODEL"
      :alt="alt"
      :poster="poster"
      :auto-rotate="spin || undefined"
      :camera-controls="interactive || undefined"
      rotation-per-second="16deg"
      auto-rotate-delay="600"
      environment-image="neutral"
      exposure="1.05"
      shadow-intensity="0.85"
      shadow-softness="0.9"
      camera-orbit="18deg 80deg 105%"
      min-camera-orbit="auto 55deg auto"
      max-camera-orbit="auto 95deg auto"
      interaction-prompt="none"
      touch-action="pan-y"
      disable-zoom
      disable-pan
      disable-tap
      loading="eager"
    />

    <!-- What SSR, prerendering, no-JS visitors and the brief pre-import window
         on the client all get. -->
    <img v-else :src="poster" :alt="alt" width="512" height="512" decoding="async" />
  </div>
</template>

<style scoped>
.mascot-3d {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--mascot-size, 100%);
  aspect-ratio: 1;
}

.mascot-3d > :deep(*) {
  width: 100%;
  height: 100%;
}

.mascot-3d img {
  object-fit: contain;
}

/* model-viewer paints its own transparent canvas; the glow behind it comes
   from the page, so the element itself must not introduce a background. */
.mascot-3d :deep(model-viewer) {
  background-color: transparent;
  --poster-color: transparent;
  /* The progress ring is a spinner on a marketing page — the poster already
     communicates "this is Tama", so a loading indicator adds only noise. */
  --progress-bar-height: 0px;
}

.is-hero :deep(model-viewer) {
  /* Grabbing works, but only where it is useful. */
  cursor: grab;
}

.is-hero :deep(model-viewer:active) {
  cursor: grabbing;
}

.is-mark {
  aspect-ratio: 1;
}

.is-mark :deep(model-viewer) {
  pointer-events: none;
}
</style>
