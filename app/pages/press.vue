<script setup lang="ts">
useTamaSeo({
  title: 'Press Kit & Media Assets',
  description:
    'Tama AI press kit. Brand boilerplate, high-resolution mascot artwork, app screenshots, and key facts for journalists and media.',
  path: '/press',
  breadcrumbs: [{ name: 'Press Kit', path: '/press' }],
})

const assets = [
  {
    label: 'Tama mascot avatar',
    file: '/images/tama_mascot_avatar.jpg',
    desc: 'Primary mascot — soft cream-coloured cloud creature with green sprout, starry night sky.',
  },
  {
    label: 'Sunset hill scene',
    file: '/images/tama_sunset_hill.jpg',
    desc: 'Tama sitting on a grassy hill at sunset with a cup of tea.',
  },
  {
    label: 'Open Lifebook',
    file: '/images/tama_open_lifebook.jpg',
    desc: 'An open journal on a desk with illustrations, polaroids, and a fountain pen.',
  },
  {
    label: 'Cozy night',
    file: '/images/tama_cozy_night.jpg',
    desc: 'Tama dozing on a windowsill at night beside a lantern, with snow falling outside.',
  },
  {
    label: 'Sleeping on clouds',
    file: '/images/tama_sleeping_clouds.jpg',
    desc: 'Tama asleep on a cloud beneath a starry purple sky.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Press kit"
      title="Media assets & brand info"
      lede="Everything a journalist, blogger, or content creator needs to write about Tama accurately. All assets are free to use in coverage about Tama."
    />

    <!-- ============================== boilerplate ======================== -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Brand boilerplate</h2>
        <blockquote>
          Tama is an AI companion that listens to your day, remembers the people who
          matter, quietly notices when something feels off, and compiles your life into a
          beautiful evolving journal — your Lifebook. No romantic roleplay. No ads. Care
          is never paywalled.
        </blockquote>

        <h2>Key facts</h2>
        <div class="deflist">
          <div>
            <dt>App name</dt>
            <dd>{{ APP.fullName }}</dd>
          </div>
          <div>
            <dt>Developer</dt>
            <dd>{{ APP.developer }}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{{ APP.platform }} (iOS planned)</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{{ APP.category }}</dd>
          </div>
          <div>
            <dt>Content rating</dt>
            <dd>{{ APP.contentRating }}</dd>
          </div>
          <div>
            <dt>Pricing</dt>
            <dd>Free with optional premium subscription (no ads at any tier)</dd>
          </div>
          <div>
            <dt>Built for</dt>
            <dd>RevenueCat Shipaton 2026</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
            </dd>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================== media assets ======================= -->
    <section class="section alt-bg">
      <div class="wrap">
        <header class="sec-head reveal">
          <p class="eyebrow">Media assets</p>
          <h2>Screenshots & artwork</h2>
          <p class="lede">
            Right-click or long-press any image to save. All images are high-resolution
            and free to use in coverage about Tama.
          </p>
        </header>

        <div class="grid g-3">
          <figure
            v-for="(a, i) in assets"
            :key="a.label"
            class="asset reveal"
            :style="{ '--reveal-delay': `${i * 60}ms` }"
          >
            <img
              :src="a.file"
              :alt="a.desc"
              width="600"
              height="448"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{{ a.label }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ============================== usage guidelines =================== -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Usage guidelines</h2>
        <ul>
          <li>
            <strong>Do</strong> use "Tama" or "Tama AI" when referring to the product.
          </li>
          <li>
            <strong>Do</strong> describe Tama as an "AI companion" or "AI journal" — not
            as a therapy app, mental health tool, or dating AI.
          </li>
          <li>
            <strong>Do not</strong> alter, crop, or recolour the mascot artwork in ways
            that change its character.
          </li>
          <li>
            <strong>Do not</strong> imply that Tama is a medical device or substitute
            for professional care.
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.alt-bg {
  background: var(--tama-surface);
  border-block: 1px solid var(--tama-hairline);
}

.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

.asset {
  margin: 0;
}

.asset img {
  border-radius: 16px;
  box-shadow: var(--shadow-page);
  border: 1px solid var(--tama-hairline);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
}

.asset img:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}

.asset figcaption {
  margin-top: 0.6rem;
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--tama-ink-soft);
  text-align: center;
}
</style>
