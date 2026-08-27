<script setup lang="ts">
useTamaSeo({
  title: 'Terms of Service',
  description:
    'Tama AI terms of use. Covers acceptable use, subscription cancellation via Google Play and RevenueCat, age requirements (18+), content boundaries, and data deletion. Effective 27 August 2026.',
  path: '/terms',
  type: 'article',
  datePublished: '2026-08-27',
  dateModified: '2026-08-27',
  breadcrumbs: [{ name: 'Terms of Service', path: '/terms' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Legal"
      title="Terms of Service"
      lede="By using Tama, you agree to these terms. We have tried to write them in plain language while covering the ground we legally need to cover."
    >
      <p class="meta">
        <strong>Effective date:</strong> {{ APP.legalEffective }}<br />
        <strong>Publisher:</strong> {{ APP.developer }} ·
        <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
      </p>
    </PageHero>

    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>1. What Tama is</h2>
        <p>
          Tama is an AI companion and journalling application. It is not a medical
          device, not a therapy service, not an emergency service, and not a substitute
          for professional care. It is designed to listen, remember, and reflect — not to
          diagnose, prescribe, or treat.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          Tama is intended for users aged <strong>18 and over</strong>. By creating an
          account, you confirm that you meet this age requirement. The app applies an
          age gate at signup.
        </p>

        <h2>3. Your account</h2>
        <p>
          You are responsible for maintaining the security of your account credentials.
          You agree not to share your account with others. If you suspect unauthorised
          access, contact us immediately at
          <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>.
        </p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to use Tama to:</p>
        <ul>
          <li>Attempt to elicit romantic, sexual, or intimate roleplay</li>
          <li>Harass, abuse, or impersonate other people</li>
          <li>Generate content that is illegal in your jurisdiction</li>
          <li>
            Attempt to reverse-engineer, extract, or circumvent the system's behavioural
            boundaries
          </li>
          <li>Use the service for commercial purposes without written permission</li>
        </ul>

        <h2>5. Content boundaries</h2>
        <p>
          Tama enforces content boundaries at the system level. It will not engage in
          romantic or intimate roleplay, use clinical or diagnostic language, or attempt
          to provide medical advice. These are permanent product constraints, not
          configurable settings.
        </p>

        <h2>6. Subscriptions and payment</h2>
        <p>
          Tama offers a free tier and a premium subscription. Subscriptions are
          purchased and managed through <strong>Google Play</strong> and processed by
          <strong>RevenueCat</strong>.
        </p>
        <ul>
          <li>
            <strong>Cancellation:</strong> You may cancel your subscription at any time
            through Google Play settings. Your premium features remain active until the
            end of the current billing period.
          </li>
          <li>
            <strong>Refunds:</strong> Refund requests are handled through Google Play's
            standard refund process.
          </li>
          <li>
            <strong>Price changes:</strong> If we change subscription pricing, existing
            subscribers will be notified in advance and given the option to cancel before
            the new price takes effect.
          </li>
        </ul>

        <h2>7. Your data</h2>
        <p>
          Your data is governed by our
          <NuxtLink to="/privacy">Privacy Policy</NuxtLink>. In summary:
        </p>
        <ul>
          <li>Your data is never sold or used to train third-party AI models</li>
          <li>Journal entries are always saved and exportable, regardless of tier</li>
          <li>
            Account deletion is permanent and irreversible — it removes real data, not a
            flag
          </li>
        </ul>

        <h2>8. Intellectual property</h2>
        <p>
          The Tama name, mascot artwork, design system, and website content are the
          property of {{ APP.developer }}. Your conversations and journal entries remain
          yours — we claim no ownership of your personal content.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          Tama is provided "as is" without warranties of any kind, express or implied.
          {{ APP.developer }} is not liable for any damages arising from your use of the
          service, including but not limited to emotional distress, data loss, or
          interruption of service.
        </p>
        <p>
          Tama is not an emergency service. If you are in crisis, please contact a human
          helpline:
        </p>
        <div class="callout callout-warm">
          <p>
            <strong>India:</strong>
            <a href="tel:+919152987821">+91 9152987821</a> (AASRA) ·
            <a href="tel:14416">14416</a> (Tele-MANAS)<br />
            <strong>US:</strong> Call or text <a href="tel:988">988</a><br />
            <strong>Elsewhere:</strong>
            <a
              href="https://findahelpline.com"
              rel="noopener noreferrer"
              target="_blank"
              >findahelpline.com</a
            >
          </p>
        </div>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms as the product evolves. Material changes will be
          communicated through the app and on this page. Continued use after changes
          constitutes acceptance.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these terms, email
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
