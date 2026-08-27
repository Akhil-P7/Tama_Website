<script setup lang="ts">
useTamaSeo({
  title: 'Privacy Policy',
  description:
    'Tama AI privacy policy. Covers local encryption, Supabase backend, screen-time deviation opt-in, zero third-party data selling, and one-tap account deletion. Effective 27 August 2026.',
  path: '/privacy',
  type: 'article',
  datePublished: '2026-08-27',
  dateModified: '2026-08-27',
  breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Legal"
      title="Privacy Policy"
      lede="This policy describes what data Tama collects, why, how it is stored, and how you can delete it. We have tried to make it readable rather than impressive."
    >
      <p class="meta">
        <strong>Effective date:</strong> {{ APP.legalEffective }}<br />
        <strong>Publisher:</strong> {{ APP.developer }} ·
        <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
      </p>
    </PageHero>

    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>1. Who we are</h2>
        <p>
          Tama is an AI companion and journalling application published by
          <strong>{{ APP.developer }}</strong
          >, an individual developer. There is no parent company, subsidiary, or
          advertising network behind this product.
        </p>
        <p>
          Contact: <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
        </p>

        <h2>2. What we collect and why</h2>
        <div class="deflist">
          <div>
            <dt>Account information</dt>
            <dd>
              Email address and display name, used for authentication and to address you
              in conversation. Stored in Supabase Auth.
            </dd>
          </div>
          <div>
            <dt>Conversation content</dt>
            <dd>
              The messages you send and Tama's replies. Required to produce contextual,
              memory-aware responses. Stored encrypted at rest in Supabase.
            </dd>
          </div>
          <div>
            <dt>Memory graph</dt>
            <dd>
              Structured facts extracted from your conversations — people, preferences,
              themes. Used for active memory recall. You can view and delete individual
              memories.
            </dd>
          </div>
          <div>
            <dt>Journal entries</dt>
            <dd>
              Auto-generated daily summaries of your conversations. Stored alongside your
              account and exportable at any time.
            </dd>
          </div>
          <div>
            <dt>Photos</dt>
            <dd>
              Images you attach to moments. Compressed on upload and stored in Supabase
              Storage. Threaded into the matching Lifebook day page.
            </dd>
          </div>
          <div>
            <dt>Screen-time deviation signal (opt-in only)</dt>
            <dd>
              If you opt in to proactive pattern detection, the app measures aggregate
              device screen time <strong>on your device</strong>. Your raw usage log
              never leaves the phone. Only a small derived signal — "deviation detected,
              magnitude significant" — is sent to the server.
            </dd>
          </div>
        </div>

        <h2>3. What we do NOT collect</h2>
        <ul>
          <li>Per-app usage breakdown (which apps you opened)</li>
          <li>Location data</li>
          <li>Contact lists or address books</li>
          <li>Advertising identifiers or tracking pixels</li>
          <li>Biometric data</li>
        </ul>

        <h2>4. How data is stored</h2>
        <p>
          All data is stored in <strong>Supabase</strong> (hosted on cloud
          infrastructure). Data is encrypted in transit (TLS 1.2+) and at rest
          (AES-256). Access is restricted by row-level security policies — your data is
          only accessible to your authenticated session.
        </p>

        <h2>5. Third-party data sharing</h2>
        <p>
          Your data is <strong>never sold</strong>. Your conversations are
          <strong>not used to train third-party AI models</strong>. We are honest about
          the flip side: producing a thoughtful reply genuinely requires sending your
          message to a language-model provider (currently Google's Gemini). That provider
          processes the request and returns a response — it does not retain your data for
          training under our API terms.
        </p>

        <h2>6. Subscription and payment</h2>
        <p>
          Subscriptions are managed entirely through <strong>Google Play</strong> and
          processed by <strong>RevenueCat</strong>. We never see, store, or process your
          payment card details. Cancellation is handled through Google Play settings.
        </p>

        <h2>7. Your rights and controls</h2>
        <ul>
          <li>
            <strong>View:</strong> See what Tama has remembered about you in the app
            under Profile → Memory.
          </li>
          <li>
            <strong>Delete specific data:</strong> Remove individual memories, entries,
            or photos from the app.
          </li>
          <li>
            <strong>Export:</strong> Download your journal entries at any time, on any
            tier.
          </li>
          <li>
            <strong>Delete your account:</strong> From inside the app under Profile →
            Privacy & Data, or by emailing
            <a :href="`mailto:${APP.email}`">{{ APP.email }}</a
            >. Deletion removes real rows from the database and real files from storage
            — it is not a hidden soft-delete flag.
          </li>
        </ul>
        <p>
          <NuxtLink to="/delete-account"
            >Full account deletion instructions →</NuxtLink
          >
        </p>

        <h2>8. Children's privacy</h2>
        <p>
          Tama is intended for adults aged 18 and over. It is not designed or directed to
          children. The app applies an age gate at signup. If we learn that a user under
          18 has created an account, we will delete it.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy as the product evolves. Material changes will be
          communicated through the app and on this page. The effective date at the top
          reflects the most recent revision.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions, concerns, or data deletion requests, email
          <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.meta {
  margin-top: 1.2rem;
  font-size: var(--step--1);
  color: var(--tama-ink-soft);
  line-height: 1.7;
}

.meta a {
  color: var(--tama-warmth);
}
</style>
