<script setup lang="ts">
/**
 * StarScatter — the decorative cluster discord.com sprinkles at its section
 * seams instead of a hard divider line.
 *
 * Positions are a hand-picked constant, never randomised: a Math.random()
 * scatter would produce different markup on the server and the client and
 * trigger a hydration mismatch.
 *
 * Purely decorative, so the wrapper is aria-hidden and pointer-events: none
 * (set globally on `.stars`).
 */

type Star = {
  /** left, as a percentage of the container */
  x: number
  /** top, as a percentage of the container */
  y: number
  /** rendered size in px */
  s: number
  /** animation offset in ms, so the cluster twinkles out of sync */
  d: number
}

/**
 * `dense`  — a wide field, for a hero band
 * `seam`   — a horizontal ribbon, for sitting across a section boundary
 * `sparse` — a light dusting, for a band that already has other decoration
 */
const FIELDS: Record<'dense' | 'seam' | 'sparse', Star[]> = {
  dense: [
    { x: 4, y: 14, s: 18, d: 0 },
    { x: 11, y: 46, s: 11, d: 900 },
    { x: 7, y: 76, s: 26, d: 1800 },
    { x: 17, y: 8, s: 13, d: 2500 },
    { x: 22, y: 66, s: 17, d: 600 },
    { x: 29, y: 28, s: 10, d: 3200 },
    { x: 34, y: 88, s: 21, d: 1300 },
    { x: 41, y: 52, s: 12, d: 2100 },
    { x: 47, y: 12, s: 15, d: 400 },
    { x: 53, y: 82, s: 11, d: 2900 },
    { x: 61, y: 34, s: 24, d: 1000 },
    { x: 68, y: 70, s: 13, d: 3600 },
    { x: 74, y: 18, s: 19, d: 200 },
    { x: 81, y: 56, s: 11, d: 2400 },
    { x: 87, y: 86, s: 16, d: 1500 },
    { x: 92, y: 24, s: 22, d: 3000 },
    { x: 96, y: 62, s: 12, d: 700 },
  ],
  seam: [
    { x: 6, y: 44, s: 14, d: 0 },
    { x: 14, y: 22, s: 22, d: 1100 },
    { x: 21, y: 68, s: 10, d: 2200 },
    { x: 31, y: 36, s: 17, d: 500 },
    { x: 43, y: 60, s: 12, d: 1700 },
    { x: 50, y: 20, s: 25, d: 800 },
    { x: 59, y: 72, s: 13, d: 2600 },
    { x: 70, y: 32, s: 16, d: 1400 },
    { x: 79, y: 64, s: 11, d: 300 },
    { x: 88, y: 26, s: 20, d: 1900 },
    { x: 95, y: 56, s: 13, d: 3100 },
  ],
  sparse: [
    { x: 8, y: 26, s: 16, d: 0 },
    { x: 24, y: 74, s: 11, d: 1400 },
    { x: 46, y: 16, s: 20, d: 2600 },
    { x: 67, y: 62, s: 12, d: 800 },
    { x: 84, y: 30, s: 18, d: 2000 },
    { x: 94, y: 78, s: 10, d: 3300 },
  ],
}

const props = withDefaults(
  defineProps<{
    field?: 'dense' | 'seam' | 'sparse'
  }>(),
  { field: 'sparse' },
)

const stars = computed(() => FIELDS[props.field])
</script>

<template>
  <div class="stars" aria-hidden="true">
    <svg
      v-for="(st, i) in stars"
      :key="i"
      viewBox="0 0 24 24"
      fill="currentColor"
      :style="{
        '--x': `${st.x}%`,
        '--y': `${st.y}%`,
        '--s': `${st.s}px`,
        '--d': `${st.d}ms`,
      }"
    >
      <!-- Four-point sparkle with concave sides -->
      <path
        d="M12 0c1.1 8.2 3.8 10.9 12 12-8.2 1.1-10.9 3.8-12 12-1.1-8.2-3.8-10.9-12-12C8.2 10.9 10.9 8.2 12 0Z"
      />
    </svg>
  </div>
</template>
