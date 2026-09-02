<script setup lang="ts">
useTamaSeo({
  title: 'Plans — Free vs Premium',
  description:
    'Compare Tama Free and Tama Premium. Conversation and proactive check-ins are free forever. Premium adds unlimited memory, the rendered Lifebook, unlimited Special People, and full customisation.',
  path: '/pricing',
  breadcrumbs: [{ name: 'Plans', path: '/pricing' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Free vs Premium"
      title="Glimpse, not gate"
      lede="The part of Tama that looks after you is free, forever, uncapped. Premium earns its place by making the experience richer — not by holding anything essential hostage."
    />

    <!-- ============================== tier table ========================= -->
    <section class="section">
      <div class="wrap">
        <div class="table-scroll reveal">
          <table>
            <caption>Feature comparison</caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Free</th>
                <th scope="col">
                  <span class="badge badge-gold">Premium</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in TIERS" :key="t.label">
                <th scope="row">{{ t.label }}</th>
                <td v-if="t.free" class="yes">{{ t.free }}</td>
                <td v-else class="no">—</td>
                <td class="yes">{{ t.premium }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============================== philosophy ========================= -->
    <section class="section dark-band">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Our pricing philosophy</p>
          <h2>What we mean by "never paywall the care"</h2>
        </header>

        <div class="prose-grid">
          <article class="page-card reveal">
            <div class="chip-icon" aria-hidden="true"><Icon name="heart-hands" /></div>
            <h3>Care stays free</h3>
            <p class="small">
              Companion chat and proactive pattern check-ins are free, forever, uncapped.
              These are the features that look after you — and they are not a subscription
              upsell.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 60ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="book" /></div>
            <h3>Your past stays yours</h3>
            <p class="small">
              Every journal entry you create stays saved, stays exportable, and is never
              deleted because you stopped paying. A free account loses the visual Lifebook
              rendering — it does not lose the entries themselves.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 120ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="circle-slash" /></div>
            <h3>No advertising, ever</h3>
            <p class="small">
              There are no advertisements at any tier. No ad identifiers. No tracking
              pixels. Revenue comes from subscriptions — nothing else.
            </p>
          </article>

          <article class="page-card reveal" style="--reveal-delay: 180ms">
            <div class="chip-icon" aria-hidden="true"><Icon name="card" /></div>
            <h3>Cancel anytime</h3>
            <p class="small">
              Subscriptions are managed through Google Play. Cancel anytime from your
              device settings. No dark patterns, no retention walls, no locked-in
              commitments.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================== data ownership ===================== -->
    <section class="section">
      <div class="wrap wrap-narrow">
        <header class="sec-head reveal">
          <p class="eyebrow">Data ownership</p>
          <h2>What happens when you leave</h2>
        </header>

        <div class="callout callout-warm reveal">
          <p>
            <strong>If you cancel your subscription:</strong> You keep every entry you
            ever created. They remain saved and exportable. You lose the visual Lifebook
            rendering and some of Tama's fluent recall of older entries — not the entries
            themselves.
          </p>
        </div>

        <div class="callout callout-calm reveal" style="--reveal-delay: 60ms">
          <p>
            <strong>If you delete your account:</strong> Deletion actually removes your
            rows from the database and your files from storage. It is not a hidden
            soft-delete flag. This is a real, permanent, irreversible deletion.
          </p>
        </div>

        <p class="reveal center-link" style="--reveal-delay: 120ms">
          <NuxtLink to="/delete-account">
            How to delete your account<Icon name="arrow-right" />
          </NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.sec-head {
  max-width: 62ch;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.sec-head h2 {
  font-size: var(--step-3);
}

/* .chip-icon is styled globally in assets/css/main.css. */

.prose-grid {
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.85rem);
}

.center-link {
  margin-top: 1.6rem;
  text-align: center;
  font-size: var(--step--1);
  font-weight: 600;
}

.center-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--tama-warmth);
  text-decoration: none;
}

.center-link a:hover {
  text-decoration: underline;
}

.center-link :deep(.icon) {
  width: 1.15em;
  height: 1.15em;
  transition: translate 0.24s var(--ease-out);
}

.center-link a:hover :deep(.icon) {
  translate: 4px 0;
}

@media (min-width: 640px) {
  .prose-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
