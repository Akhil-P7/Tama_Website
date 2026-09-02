<script setup lang="ts">
/**
 * The site's whole icon set, in one file.
 *
 * Every pictograph on the site used to be an emoji. Emoji are rendered by the
 * operating system, which means they were a different drawing on Android than
 * on Windows than on iOS, they never took the surrounding text colour, they
 * ignored stroke weight, and screen readers announced them as words in the
 * middle of a heading. These replace them: one 24×24 grid, one stroke weight,
 * `currentColor` throughout, so an icon inside a night band is light and the
 * same icon inside a cream card is dark with no extra rules.
 *
 * Icons are decorative by default (`aria-hidden`), because in every place they
 * appear the adjacent text already carries the meaning. Pass a `label` for the
 * rare standalone case and the SVG becomes an `img` with an accessible name.
 */
type IconName = keyof typeof PATHS

const props = withDefaults(
  defineProps<{
    name: IconName
    /** Rendered size in px. Inherits font-size when left at 'em'. */
    size?: number | string
    /** Accessible name. Omit for decorative icons. */
    label?: string
    /** Stroke weight on the 24-unit grid. */
    weight?: number
  }>(),
  { size: 'em', weight: 1.7 },
)

/**
 * Path data on a 24×24 grid, drawn for stroke rendering: no fills, rounded
 * caps and joins, and a consistent ~2.5-unit optical margin so a 20px icon
 * next to 20px text looks the same weight rather than heavier.
 *
 * `d` entries are stroked. `solid` entries are filled — used only where a
 * shape reads wrong as an outline, like a play triangle.
 */
const PATHS = {
  /* ---------------------------------------------------------- brand ------ */
  // Tama's mark: a stem with one leaf reaching up and one lower on the other
  // side, matching the sprout on the mascot's head.
  sprout: {
    d: [
      'M12 21v-8.4',
      'M12 12.6c0-3.7 2.5-6.6 6.7-6.6.4 4.2-2.7 6.6-6.7 6.6z',
      'M12 15.4c0-3-2.1-5.3-5.4-5.3-.3 3.4 2.2 5.3 5.4 5.3z',
    ],
  },

  /* ---------------------------------------------------- care & people --- */
  // A heart held in cupped hands — "never paywall the care".
  'heart-hands': {
    d: [
      'M12 13.6s-3.6-2.2-3.6-4.9A2.1 2.1 0 0 1 12 7.5a2.1 2.1 0 0 1 3.6 1.2c0 2.7-3.6 4.9-3.6 4.9z',
      'M4 15.4a8 8 0 0 0 16 0',
    ],
  },
  heart: {
    d: [
      'M12 20.3s-8.4-5-8.4-10.9A4.45 4.45 0 0 1 12 7.1a4.45 4.45 0 0 1 8.4 2.3c0 5.9-8.4 10.9-8.4 10.9z',
    ],
  },
  user: { d: ['M12 4.8a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z', 'M5 20.2a7.2 7.2 0 0 1 14 0'] },
  // Consent: a shield you have to pass through, with the approval mark inside.
  'shield-check': {
    d: ['M12 3.2 19 5.8v5.4c0 4.4-2.9 7.7-7 9.6-4.1-1.9-7-5.2-7-9.6V5.8z', 'M8.9 12.1l2.4 2.4 4.1-4.4'],
  },
  // Personality rather than a form: a face, not a hand-wave (hands read as
  // noise at 20px).
  smile: {
    d: ['M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6z', 'M8.3 14.1a4.5 4.5 0 0 0 7.4 0'],
    dots: [
      [9.4, 9.9],
      [14.6, 9.9],
    ],
  },

  /* -------------------------------------------------- memory & journal --- */
  book: {
    d: [
      'M6.6 3.2H19a.8.8 0 0 1 .8.8v16a.8.8 0 0 1-.8.8H6.6A2.4 2.4 0 0 1 4.2 18.4V5.6a2.4 2.4 0 0 1 2.4-2.4z',
      'M4.2 18.4A2.4 2.4 0 0 1 6.6 16h13.2',
    ],
  },
  'book-open': {
    d: ['M12 7.4S9.4 5.3 3.9 5.3v13.1c5.5 0 8.1 2.1 8.1 2.1s2.6-2.1 8.1-2.1V5.3c-5.5 0-8.1 2.1-8.1 2.1z', 'M12 7.4v13.1'],
  },
  brain: {
    d: [
      'M12 5.4A3.1 3.1 0 0 0 6.3 7 2.9 2.9 0 0 0 4.5 12a3 3 0 0 0 1.1 4.5A3 3 0 0 0 12 18.7z',
      'M12 5.4A3.1 3.1 0 0 1 17.7 7a2.9 2.9 0 0 1 1.8 5 3 3 0 0 1-1.1 4.5A3 3 0 0 1 12 18.7z',
      'M12 5.4v13.3',
    ],
  },
  chat: {
    d: [
      'M20.4 12.1a8.2 8.2 0 0 1-8.8 8 9.3 9.3 0 0 1-3.5-.7L3.6 20.6l1.4-4A8 8 0 0 1 3.6 12a8.2 8.2 0 0 1 8.4-8 8.2 8.2 0 0 1 8.4 8.1z',
    ],
  },
  calendar: {
    d: [
      'M5.9 5.8h12.2a1.5 1.5 0 0 1 1.5 1.5v11.2a1.5 1.5 0 0 1-1.5 1.5H5.9a1.5 1.5 0 0 1-1.5-1.5V7.3a1.5 1.5 0 0 1 1.5-1.5z',
      'M4.4 10.3h15.2',
      'M8.6 3.6v4.1',
      'M15.4 3.6v4.1',
    ],
  },
  camera: {
    d: [
      'M6.2 6.9h1.4a1 1 0 0 0 .84-.45l.93-1.4a1 1 0 0 1 .84-.45h3.58a1 1 0 0 1 .84.45l.93 1.4a1 1 0 0 0 .84.45h1.4a2 2 0 0 1 2 2v8.2a2 2 0 0 1-2 2H6.2a2 2 0 0 1-2-2V8.9a2 2 0 0 1 2-2z',
      'M12 9.6a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z',
    ],
  },
  star: {
    d: ['M12 3.7l2.6 5.5 5.9.85-4.25 4.2 1 6-5.25-2.9-5.25 2.9 1-6L3.5 10.05l5.9-.85z'],
  },
  // A moment marked in time: the quiet late-night check-in.
  moon: { d: ['M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11z'] },
  clock: { d: ['M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2z', 'M12 7.6V12l3.2 2'] },

  /* ------------------------------------------------- privacy & control --- */
  lock: {
    d: [
      'M6.3 10.6h11.4a1 1 0 0 1 1 1v7.7a1 1 0 0 1-1 1H6.3a1 1 0 0 1-1-1v-7.7a1 1 0 0 1 1-1z',
      'M8.6 10.6V8.1a3.4 3.4 0 0 1 6.8 0v2.5',
    ],
  },
  shield: { d: ['M12 3.2 19 5.8v5.4c0 4.4-2.9 7.7-7 9.6-4.1-1.9-7-5.2-7-9.6V5.8z'] },
  trash: {
    d: [
      'M4.6 7.5h14.8',
      'M9.6 7.5V5.9a1.3 1.3 0 0 1 1.3-1.3h2.2a1.3 1.3 0 0 1 1.3 1.3v1.6',
      'M6.6 7.5l.8 11.3a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.8-11.3',
      'M10.6 11v5.6',
      'M13.4 11v5.6',
    ],
  },
  download: { d: ['M12 4.2v10.9', 'M7.7 10.9 12 15.2l4.3-4.3', 'M4.6 19.6h14.8'] },
  search: { d: ['M10.7 4.3a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8z', 'M15.4 15.4l4.3 4.3'] },
  // Deliberate absence — no ads, no roleplay, no silent path.
  'circle-slash': { d: ['M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2z', 'M6.1 6.1l11.8 11.8'] },
  chart: { d: ['M4.4 19.8h15.2', 'M7.8 19.8v-5.9', 'M12 19.8V8.2', 'M16.2 19.8v-8.8'] },
  mail: {
    d: [
      'M5.4 5.7h13.2a2 2 0 0 1 2 2v8.6a2 2 0 0 1-2 2H5.4a2 2 0 0 1-2-2V7.7a2 2 0 0 1 2-2z',
      'M3.8 7.4l7.6 5.2a1 1 0 0 0 1.2 0l7.6-5.2',
    ],
  },
  card: {
    d: [
      'M5 6.2h14a1.6 1.6 0 0 1 1.6 1.6v8.4A1.6 1.6 0 0 1 19 17.8H5a1.6 1.6 0 0 1-1.6-1.6V7.8A1.6 1.6 0 0 1 5 6.2z',
      'M3.4 10.4h17.2',
      'M7 14.2h3.2',
    ],
  },
  bell: {
    d: ['M18 15.6V11a6 6 0 0 0-12 0v4.6L4.4 18.2h15.2z', 'M9.8 18.2a2.2 2.2 0 0 0 4.4 0'],
  },
  sparkle: {
    d: [
      'M11 3.6l1.5 4.2 4.2 1.5-4.2 1.5L11 15l-1.5-4.2L5.3 9.3l4.2-1.5z',
      'M18.2 14.8l.75 2.05 2.05.75-2.05.75-.75 2.05-.75-2.05-2.05-.75 2.05-.75z',
    ],
  },

  /* ------------------------------------------------------- affordances --- */
  check: { d: ['M4.6 12.6l4.9 4.9L19.4 7.6'] },
  x: { d: ['M6.2 6.2l11.6 11.6', 'M17.8 6.2L6.2 17.8'] },
  'check-circle': { d: ['M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2z', 'M8.2 12.2l2.8 2.8 4.8-5.2'] },
  'x-circle': { d: ['M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2z', 'M9.2 9.2l5.6 5.6', 'M14.8 9.2l-5.6 5.6'] },
  pencil: { d: ['M4.4 19.6h4L20 8a2.83 2.83 0 1 0-4-4L4.4 15.6z', 'M14.6 5.4l4 4'] },
  'arrow-right': { d: ['M4.6 12h14.8', 'M13.4 6l6 6-6 6'] },
  'arrow-up-right': { d: ['M7 17L17 7', 'M8.6 7H17v8.4'] },
  plus: { d: ['M12 5.4v13.2', 'M5.4 12h13.2'] },
  minus: { d: ['M5.4 12h13.2'] },
  play: { solid: ['M8.4 5.6 19 12 8.4 18.4z'] },
} as const

const icon = computed(() => PATHS[props.name] as {
  d?: readonly string[]
  solid?: readonly string[]
  dots?: readonly (readonly number[])[]
})

const dim = computed(() => (props.size === 'em' ? '1em' : `${props.size}px`))
</script>

<template>
  <svg
    class="icon"
    :class="`icon-${name}`"
    viewBox="0 0 24 24"
    :width="dim"
    :height="dim"
    :role="label ? 'img' : undefined"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label"
    fill="none"
    :stroke-width="weight"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <title v-if="label">{{ label }}</title>
    <path v-for="d in icon.d" :key="d" :d="d" stroke="currentColor" />
    <path v-for="d in icon.solid" :key="d" :d="d" fill="currentColor" stroke="none" />
    <circle
      v-for="([cx, cy], i) in icon.dots || []"
      :key="`dot-${i}`"
      :cx="cx"
      :cy="cy"
      r="0.9"
      fill="currentColor"
      stroke="none"
    />
  </svg>
</template>

<style scoped>
/* `block` prevents the inline-baseline gap that would otherwise show up
   inside flex chips, and vertical-align keeps it optically centred on the
   rare occasion it sits inline with text. */
.icon {
  display: block;
  flex: none;
  vertical-align: -0.145em;
  overflow: visible;
}
</style>
