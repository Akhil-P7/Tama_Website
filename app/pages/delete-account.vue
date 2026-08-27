<script setup lang="ts">
useTamaSeo({
  title: 'Delete Your Account & Data',
  description:
    'How to permanently delete your Tama account and all associated data. Step-by-step instructions for in-app deletion and email-based deletion.',
  path: '/delete-account',
  breadcrumbs: [{ name: 'Delete Account', path: '/delete-account' }],
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Account deletion"
      title="Delete your account and all your data"
      lede="Deletion is real. It removes your rows from the database and your files from storage. It is not a hidden soft-delete flag — it is permanent and irreversible."
    />

    <section class="section">
      <div class="wrap wrap-narrow prose">
        <h2>Option 1 — Delete from inside the app</h2>
        <ol>
          <li>Open Tama and go to your <strong>Profile</strong>.</li>
          <li>
            Tap <strong>Privacy & Data</strong>.
          </li>
          <li>
            Tap <strong>Delete my account and all data</strong>.
          </li>
          <li>
            Confirm by typing your email address when prompted.
          </li>
          <li>
            Your account, conversations, memories, journal entries, and photos will be
            permanently deleted.
          </li>
        </ol>

        <div class="callout callout-warm">
          <p>
            <strong>This is irreversible.</strong> Once confirmed, your data cannot be
            recovered. Make sure to export your journal entries first if you want to keep
            them.
          </p>
        </div>

        <hr />

        <h2>Option 2 — Delete by email</h2>
        <p>
          If you cannot access the app, send an email to
          <a :href="`mailto:${APP.email}?subject=Account%20Deletion%20Request`">{{
            APP.email
          }}</a>
          with the subject line <strong>"Account Deletion Request"</strong> from the
          email address associated with your account.
        </p>
        <p>
          We will verify your identity and process the deletion within
          <strong>7 business days</strong>. You will receive a confirmation email when
          the deletion is complete.
        </p>

        <hr />

        <h2>What gets deleted</h2>
        <div class="deflist">
          <div>
            <dt>Account & authentication</dt>
            <dd>Your email, display name, and authentication tokens.</dd>
          </div>
          <div>
            <dt>All conversations</dt>
            <dd>Every message you sent and every reply Tama gave you.</dd>
          </div>
          <div>
            <dt>Memory graph</dt>
            <dd>
              All structured facts — people, preferences, themes — extracted from your
              conversations.
            </dd>
          </div>
          <div>
            <dt>Journal entries</dt>
            <dd>All auto-generated daily summaries and Lifebook pages.</dd>
          </div>
          <div>
            <dt>Photos</dt>
            <dd>All images attached to moments, removed from storage.</dd>
          </div>
          <div>
            <dt>Screen-time data</dt>
            <dd>
              Any deviation signals stored on the server. (Raw usage data was never on
              the server to begin with.)
            </dd>
          </div>
        </div>

        <h2>What about my subscription?</h2>
        <p>
          Deleting your account does <strong>not</strong> automatically cancel your
          Google Play subscription. To avoid further charges:
        </p>
        <ol>
          <li>
            Open <strong>Google Play Store</strong> on your device.
          </li>
          <li>
            Tap your profile icon → <strong>Payments & subscriptions</strong> →
            <strong>Subscriptions</strong>.
          </li>
          <li>Find Tama and tap <strong>Cancel subscription</strong>.</li>
        </ol>

        <div class="callout callout-calm">
          <p>
            <strong>Questions?</strong> Email
            <a :href="`mailto:${APP.email}`">{{ APP.email }}</a> and we will help.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
