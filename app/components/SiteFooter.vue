<script setup lang="ts">
const year = 2026

const columns = [
  {
    heading: 'Product',
    links: [
      { name: 'All features', path: '/features' },
      { name: 'The Lifebook', path: '/lifebook' },
      { name: 'Free vs Premium', path: '/pricing' },
      { name: 'About & roadmap', path: '/about' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { name: 'Trust & safety', path: '/safety' },
      { name: 'Privacy policy', path: '/privacy' },
      { name: 'Data safety summary', path: '/data-safety' },
      { name: 'Terms of use', path: '/terms' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { name: 'Support & FAQ', path: '/support' },
      { name: 'Delete your data', path: '/delete-account' },
      { name: 'Press kit', path: '/press' },
      { name: 'For AI agents', path: '/for-agents' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer dark-band">
    <div class="wrap">
      <div class="top">
        <div class="ident">
          <NuxtLink to="/" class="fbrand" aria-label="Tama AI — home">
            <img src="/images/tama_mascot_avatar.jpg" alt="" width="46" height="46" />
            <span>
              <strong>Tama</strong>
              <em>Your life, remembered.</em>
            </span>
          </NuxtLink>
          <p class="blurb">
            An AI companion that listens to your day, remembers the people who matter,
            quietly notices when something feels off, and turns your life into a book
            you will actually want to read.
          </p>
          <ul class="pledges">
            <li>No ads, ever</li>
            <li>No romantic roleplay</li>
            <li>Care is never paywalled</li>
          </ul>
        </div>

        <nav
          v-for="col in columns"
          :key="col.heading"
          class="col"
          :aria-label="col.heading"
        >
          <h2>{{ col.heading }}</h2>
          <ul>
            <li v-for="l in col.links" :key="l.path">
              <NuxtLink :to="l.path">{{ l.name }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="crisis" role="note">
        <strong>If you are in crisis right now,</strong> please reach a human. In India, call
        <a href="tel:+919152987821">+91 9152987821</a> (AASRA) or
        <a href="tel:14416">14416</a> (Tele-MANAS). In the US, call or text
        <a href="tel:988">988</a>. Elsewhere, see
        <a href="https://findahelpline.com" rel="noopener noreferrer" target="_blank"
          >findahelpline.com</a
        >. Tama is not an emergency service.
      </div>

      <div class="bottom">
        <p class="legal">
          © {{ year }} {{ APP.developer }}. Tama is an independent project.
          Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
        <p class="contact">
          <a :href="`mailto:${APP.email}`">{{ APP.email }}</a>
          <span aria-hidden="true">·</span>
          <NuxtLink to="/support">Support</NuxtLink>
          <span aria-hidden="true">·</span>
          <a href="/sitemap.xml">Sitemap</a>
          <span aria-hidden="true">·</span>
          <a href="/llms.txt">llms.txt</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: clamp(3rem, 6vw, 5rem) 2rem;
  margin-top: auto;
}

.top {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  grid-template-columns: 1fr;
  padding-bottom: 2.5rem;
}

.fbrand {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  margin-bottom: 1.1rem;
}

.fbrand img {
  border-radius: 13px;
}

.fbrand span {
  display: grid;
  line-height: 1.25;
}

.fbrand strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: #fff;
}

.fbrand em {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--tama-peach-glow);
}

.blurb {
  max-width: 40ch;
  font-size: var(--step--1);
  color: rgba(233, 231, 255, 0.72);
  margin-bottom: 1.1rem;
}

.pledges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pledges li {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.32rem 0.7rem;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.88);
}

.col h2 {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--tama-peach-glow);
  margin-bottom: 0.9rem;
}

.col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.col a {
  font-size: var(--step--1);
  color: rgba(233, 231, 255, 0.8);
  text-decoration: none;
  transition: color 0.18s var(--ease-soft), padding-left 0.22s var(--ease-out);
}

.col a:hover {
  color: #fff;
  padding-left: 4px;
}

.crisis {
  border: 1px solid rgba(255, 217, 179, 0.34);
  background: rgba(255, 217, 179, 0.09);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  font-size: var(--step--1);
  line-height: 1.6;
  color: rgba(255, 245, 235, 0.92);
}

.crisis strong {
  color: var(--tama-peach-glow);
}

.crisis a {
  color: #fff;
  font-weight: 600;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.legal,
.contact {
  margin: 0;
  font-size: 0.78rem;
  color: rgba(233, 231, 255, 0.6);
}

.legal {
  max-width: 58ch;
}

.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.contact a {
  color: rgba(233, 231, 255, 0.86);
  text-decoration: none;
}

.contact a:hover {
  color: #fff;
  text-decoration: underline;
}

@media (min-width: 720px) {
  .top {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
  }
}
</style>
