<script setup lang="ts">
useTamaSeo({
  title: 'Trust & Safety — How Tama Keeps You Safe',
  description:
    'Tama safety architecture: consent-first Special People notifications, crisis helpline interception, strict non-romantic boundaries, and on-device screen-time analysis. Every safety feature explained.',
  path: '/safety',
  breadcrumbs: [{ name: 'Trust & Safety', path: '/safety' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Trust & Safety"
      title="Built to be trusted, not just used"
      lede="Every safety decision in Tama is enforced in code — not hidden behind a setting. This page explains exactly how each mechanism works, so you can verify the claims yourself."
    />

    <!-- ============================== consent architecture =============== -->
    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Special People — consent-first architecture</h2>
        <p>
          You can designate a few people — a sister, a partner, a best friend — who Tama
          may point toward on a hard night. Two rules make this trustworthy instead of
          alarming:
        </p>

        <div class="callout callout-calm">
          <p>
            <strong>Rule 1:</strong> They are told they have been added the moment you
            add them, so no first contact is ever a shock.
          </p>
        </div>

        <div class="callout callout-calm">
          <p>
            <strong>Rule 2:</strong> Tama asks you, in the chat, and shows you the exact
            draft, before anything sends. You can approve it, rewrite it, or say no.
            Declining sends nothing, silently.
          </p>
        </div>

        <p>
          There is no fourth option where Tama sends it anyway. No endpoint exists that
          can notify someone without your recorded approval first — enforced in the
          architecture, not just hidden in the interface.
        </p>

        <hr />

        <h2>Crisis interception</h2>
        <p>
          Tama is not an emergency service. It will never attempt to handle a crisis
          itself. If a conversation reaches a point where professional intervention
          matters, Tama does one thing: it shows you real, human helpline numbers.
        </p>

        <div class="callout callout-warm">
          <p>
            <strong>In India:</strong> Call
            <a href="tel:+919152987821">+91 9152987821</a> (AASRA) or
            <a href="tel:14416">14416</a> (Tele-MANAS).<br />
            <strong>In the US:</strong> Call or text
            <a href="tel:988">988</a> (Suicide & Crisis Lifeline). Text HOME to
            <a href="sms:741741">741741</a> (Crisis Text Line).<br />
            <strong>Elsewhere:</strong>
            <a href="https://findahelpline.com" rel="noopener noreferrer" target="_blank"
              >findahelpline.com</a
            >.
          </p>
        </div>

        <hr />

        <h2>Non-romantic boundary</h2>
        <p>
          Tama does not do romantic or intimate roleplay at any subscription tier. This
          is a permanent product boundary written into the companion's behaviour rules,
          not a feature being held back to sell later. It is enforced at the system prompt
          level and in the content moderation layer — there is no way to unlock it.
        </p>

        <hr />

        <h2>Non-clinical language</h2>
        <p>
          Tama may say "tonight felt heavy." It will never say "you seem depressed." It
          observes — it does not diagnose. The instruction set explicitly prohibits
          clinical, diagnostic, and prescriptive language. Tama is a companion and
          journalling app, not a medical device.
        </p>

        <hr />

        <h2>Screen-time pattern detection — on your terms</h2>
        <p>
          This feature requires explicit opt-in, in plain language, before anything is
          measured. Here is exactly what happens:
        </p>
        <ul>
          <li>
            Tama looks at your <strong>aggregate device screen time only</strong> — the
            total, never a breakdown of which apps you opened.
          </li>
          <li>
            The calculation happens <strong>on your phone</strong>. Your raw usage log
            never leaves the device.
          </li>
          <li>
            All that is ever sent to the server is a small derived signal such as
            "deviation detected, magnitude significant."
          </li>
          <li>
            The comparison is against <strong>your own rolling baseline</strong>, not a
            fixed universal threshold.
          </li>
        </ul>

        <hr />

        <h2>Data handling summary</h2>
        <p>
          We will never claim "nothing leaves your device." Producing a reply genuinely
          requires sending your message to a language-model provider. What we can say
          accurately:
        </p>
        <ul>
          <li>Data is encrypted in transit (TLS) and at rest (AES-256)</li>
          <li>Never sold. Never used to train third-party models.</li>
          <li>No advertising identifiers, because there is no advertising</li>
          <li>
            One-tap deletion that removes real rows and real files — not a hidden
            soft-delete flag
          </li>
        </ul>

        <div class="btn-row">
          <NuxtLink to="/privacy" class="btn btn-ink">Full privacy policy</NuxtLink>
          <NuxtLink to="/data-safety" class="btn btn-ghost">Data safety summary</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}
</style>
