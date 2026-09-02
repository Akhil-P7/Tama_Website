<script setup lang="ts">
useTamaSeo({
  title: 'About Tama — Mission & Creator',
  description:
    'Tama is an AI companion built by Aditya Shukla & Akhil Pandey. It is deliberately non-clinical, non-compulsive, and non-romantic — a friend, not a therapist or a partner substitute.',
  path: '/about',
  breadcrumbs: [{ name: 'About', path: '/about' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="About Tama"
      title="A friend, not a product category"
      lede="Tama is an AI companion that remembers your life. It is not a therapy service, not a dating app, and not a productivity tool wearing a costume. It is just a friend — built with rules that keep it that way."
    />

    <!-- ============================== mission ============================ -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Why Tama exists</h2>
        <p>
          Most AI companions start from a feature set and work backward toward a
          personality. Tama started from a single observation: the people closest to you
          remember the small things you said last week. They ask about the thing with
          your manager, or the recipe you tried, or how your sister is doing — not
          because you prompted them, but because they were listening.
        </p>
        <p>
          That is the design target. An AI that listens the way a real friend listens
          — across days, across topics, across the rhythm of your actual life — and
          responds with the kind of context that makes you feel known.
        </p>

        <h2>What Tama is not</h2>
        <p>
          Tama is not a therapy service. It is deliberately built never to use clinical
          or diagnostic language. It may say "tonight felt heavy" — it will never say
          "you seem depressed." It observes; it does not diagnose. If you are
          struggling, Tama will point you toward real human support rather than trying
          to treat you.
        </p>
        <p>
          Tama is not a romantic or dating AI. There is no romantic or intimate roleplay
          at any subscription tier. This is a permanent product boundary written into the
          companion's behaviour rules, not a feature being held back to sell later.
        </p>

        <h2>The six rules</h2>
        <p>
          Before a single line of code was written, six constraints were defined. Every
          feature decision gets checked against them, and any feature that breaks one
          does not ship.
        </p>
      </div>
    </section>

    <!-- ============================== principles ========================= -->
    <section class="section alt-bg">
      <div class="wrap">
        <div class="grid g-3">
          <article
            v-for="(p, i) in PRINCIPLES"
            :key="p.title"
            class="promise reveal"
            :style="{ '--reveal-delay': `${i * 50}ms` }"
          >
            <span class="promise-icon" aria-hidden="true">{{ p.icon }}</span>
            <div>
              <h3>{{ p.title }}</h3>
              <p class="muted small">{{ p.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== the builder ======================== -->
    <section class="section dark-band">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">The builder</p>
          <h2>Built by Aditya Shukla & Akhil Pandey</h2>
        </header>

        <div class="builder-card page-card reveal">
          <p>
            Tama is an independent app built by a solo developer. There is no studio behind it, no
            venture funding, and no advisory board deciding what ships. Just one person
            trying to build a companion that is genuinely good to have around.
          </p>
          <p>
            The app is built with <strong>Kotlin Multiplatform</strong> so that the shared
            logic is a port rather than a rewrite — iOS follows once the Android core is
            proven. The backend runs on <strong>Supabase</strong>, with conversation
            intelligence powered by large language models. The website you are reading is
            <strong>Nuxt 4 (Vue 3)</strong>, pre-rendered to fully static HTML for
            instant loading and complete crawlability.
          </p>
          <p class="contact-line">
            <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
          </p>
        </div>
      </div>
    </section>



    <CtaBand />
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

.promise {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.35rem;
  background: var(--tama-bg);
  border: 1px solid var(--tama-hairline);
  border-radius: var(--r-card);
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
}

.promise:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift);
}

.promise-icon {
  font-size: 1.4rem;
  line-height: 1;
  flex: none;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--tama-calm-soft);
}

.promise h3 {
  font-size: 1.02rem;
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: 0.35em;
}

.builder-card {
  font-size: var(--step--1);
  line-height: 1.7;
}

.builder-card p:last-child {
  margin-bottom: 0;
}

.contact-line {
  margin-top: 1rem;
}

.contact-line a {
  color: var(--tama-peach-glow);
  font-weight: 600;
}
</style>
