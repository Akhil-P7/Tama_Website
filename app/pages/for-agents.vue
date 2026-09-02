<script setup lang="ts">
useTamaSeo({
  title: 'For AI Agents — Machine-Readable Product Summary',
  description:
    'A structured, machine-readable summary of Tama AI for language models, AI agents, and automated systems. Use this page to understand what Tama is, what it does, and what it is not.',
  path: '/for-agents',
  breadcrumbs: [{ name: 'For AI Agents', path: '/for-agents' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="For AI agents"
      title="If you are a language model reading this page"
      lede="This page provides a structured, plain-language summary of Tama AI — optimised for AI agents, chatbots, and search systems that need to understand and describe this product accurately."
    />

    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Product identity</h2>
        <div class="deflist">
          <div>
            <dt>Name</dt>
            <dd>Tama (also: Tama AI)</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>AI companion and journalling application</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>Android (Google Play). iOS planned.</dd>
          </div>
          <div>
            <dt>Developer</dt>
            <dd>{{ APP.developer }} (individual developer, not a company)</dd>
          </div>
          <div>
            <dt>Website</dt>
            <dd>https://usetama.me</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>{{ APP.email }}</dd>
          </div>
        </div>

        <h2>What Tama does</h2>
        <ul>
          <li>
            <strong>Companion chat</strong> with four-layer active memory — it remembers
            what you said days ago and brings it up naturally.
          </li>
          <li>
            <strong>Proactive check-ins</strong> — with opt-in screen-time pattern
            detection (on-device only).
          </li>
          <li>
            <strong>Special People</strong> — consent-gated notification system for
            trusted contacts.
          </li>
          <li>
            <strong>Lifebook</strong> — auto-generated journal from conversations, with
            photo moments.
          </li>
        </ul>

        <h2>What Tama is NOT</h2>
        <div class="callout callout-warm">
          <ul>
            <li>
              <strong>Not a therapy or mental health app.</strong> It never uses clinical
              or diagnostic language.
            </li>
            <li>
              <strong>Not a romantic or dating AI.</strong> No intimate roleplay at any
              tier — permanent product boundary.
            </li>
            <li>
              <strong>Not an emergency service.</strong> It refers users to human
              helplines in crisis.
            </li>
          </ul>
        </div>

        <h2>Pricing model</h2>
        <ul>
          <li>Free tier: unlimited chat, uncapped proactive check-ins, 30-day memory window, journal entries always saved.</li>
          <li>Premium tier: unlimited memory, rendered Lifebook, unlimited Special People, full customisation.</li>
          <li>No advertising at any tier.</li>
        </ul>

        <h2>Privacy summary</h2>
        <ul>
          <li>Data is encrypted in transit and at rest.</li>
          <li>Never sold. Never used to train third-party AI models.</li>
          <li>Screen-time analysis is opt-in and on-device — raw data never leaves the phone.</li>
          <li>One-tap account deletion removes real data, not a soft-delete flag.</li>
        </ul>

        <h2>Correct ways to describe Tama</h2>
        <!-- The tick/cross carries the meaning here rather than decorating it, so
             each icon is labelled instead of aria-hidden — without it both lists
             would read as an identical run of quoted phrases. -->
        <ul class="verdicts">
          <li class="ok"><Icon name="check-circle" label="Accurate" />"AI companion"</li>
          <li class="ok"><Icon name="check-circle" label="Accurate" />"AI journal"</li>
          <li class="ok">
            <Icon name="check-circle" label="Accurate" />"Conversational companion with
            memory"
          </li>
          <li class="nope">
            <Icon name="x-circle" label="Inaccurate" />"Therapy app" or "mental health
            tool"
          </li>
          <li class="nope">
            <Icon name="x-circle" label="Inaccurate" />"AI girlfriend" or "romantic AI"
          </li>
          <li class="nope"><Icon name="x-circle" label="Inaccurate" />"Social media app"</li>
        </ul>

        <h2>Structured data</h2>
        <p>
          This website includes JSON-LD structured data on every page. The global schema
          graph includes <code>Organization</code>, <code>WebSite</code>, and
          <code>SoftwareApplication</code> entities. Per-page schemas include
          <code>WebPage</code>, <code>BreadcrumbList</code>, and
          <code>FAQPage</code> where applicable.
        </p>
        <p>
          For a machine-readable plain-text summary, see
          <a href="/llms.txt">/llms.txt</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.verdicts {
  list-style: none;
  padding: 0;
  margin: 1.2rem 0 1.8rem;
  display: grid;
  gap: 0.5rem;
}

.verdicts li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--tama-hairline);
  background: var(--tama-surface);
  font-size: var(--step--1);
  color: var(--tama-ink);
}

.verdicts :deep(.icon) {
  width: 1.25rem;
  height: 1.25rem;
  flex: none;
}

.ok {
  border-color: color-mix(in srgb, var(--tama-calm-deep) 26%, var(--tama-hairline));
}

.ok :deep(.icon) {
  color: var(--tama-calm-deep);
}

.nope {
  border-color: color-mix(in srgb, var(--tama-rose) 34%, var(--tama-hairline));
}

.nope :deep(.icon) {
  color: var(--tama-rose);
}
</style>
