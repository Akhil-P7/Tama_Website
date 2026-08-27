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
        <ul>
          <li>✅ "AI companion"</li>
          <li>✅ "AI journal"</li>
          <li>✅ "Conversational companion with memory"</li>
          <li>❌ "Therapy app" or "mental health tool"</li>
          <li>❌ "AI girlfriend" or "romantic AI"</li>
          <li>❌ "Social media app"</li>
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
