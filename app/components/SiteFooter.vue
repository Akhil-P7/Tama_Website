<script setup lang="ts">
/**
 * Site footer, following discord.com's shape: a brand block beside grouped
 * link columns, a thin legal bar, and an oversized wordmark cropped by the
 * bottom edge of the page.
 *
 * The wordmark is decorative texture rather than content — the brand name is
 * already announced in the link above it — so it is aria-hidden.
 *
 * There is no social-icon row because Tama has no social accounts; inventing
 * dead links would break the site's own honesty rule.
 */
const year = 2026

const columns = [
  {
    heading: 'Product',
    links: [
      { name: 'All features', path: '/features' },
      { name: 'The Lifebook', path: '/lifebook' },
      { name: 'How memory works', path: '/memory' },
      { name: 'Free vs Premium', path: '/pricing' },
      { name: "What's new", path: '/updates' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { name: 'Trust & safety', path: '/safety' },
      { name: 'Privacy policy', path: '/privacy' },
      { name: 'Data safety summary', path: '/data-safety' },
      { name: 'Terms of use', path: '/terms' },
      { name: 'Delete your data', path: '/delete-account' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'About & roadmap', path: '/about' },
      { name: 'Support & FAQ', path: '/support' },
      { name: 'Press kit', path: '/press' },
      { name: 'For AI agents', path: '/for-agents' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer band-night">
    <StarScatter field="sparse" />

    <div class="wrap wrap-wide inner">
      <div class="top">
        <div class="ident">
          <NuxtLink to="/" class="fbrand" aria-label="Tama AI — home">
            <img src="/images/tama-sprout-icon-180.png" alt="" width="44" height="44" />
            <span class="fbrand-word">tama</span>
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

        <div class="cols">
          <nav v-for="col in columns" :key="col.heading" :aria-label="col.heading">
            <h2>{{ col.heading }}</h2>
            <ul>
              <li v-for="l in col.links" :key="l.path">
                <NuxtLink :to="l.path">{{ l.name }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
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

    <!-- The Discord move: brand set enormous and cropped by the page edge -->
    <div class="wordmark" aria-hidden="true">
      <span>tama</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  padding-top: clamp(3rem, 6vw, 5rem);
  margin-top: auto;
}

.inner {
  position: relative;
  z-index: 2;
}

.top {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  grid-template-columns: 1fr;
  padding-bottom: 2.5rem;
}

/* ------------------------------------------------------------- identity --- */
.fbrand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  margin-bottom: 1.1rem;
}

.fbrand img {
  /* Transparent render — the shadow has to follow the silhouette rather than
     outline a square. */
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
  transition: transform 0.34s var(--ease-spring);
}

.fbrand:hover img {
  transform: rotate(-8deg) scale(1.1);
}

.fbrand-word {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1;
  color: #fff;
}

.blurb {
  max-width: 42ch;
  font-size: var(--step--1);
  color: var(--on-night-soft);
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
  padding: 0.34rem 0.75rem;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.88);
}

/* -------------------------------------------------------------- columns --- */
.cols {
  display: grid;
  gap: clamp(1.75rem, 3vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr));
}

.cols h2 {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--tama-peach-glow);
  margin-bottom: 0.9rem;
}

.cols ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.6rem;
}

.cols a {
  font-size: var(--step--1);
  color: rgba(233, 231, 255, 0.8);
  text-decoration: none;
  transition: color 0.18s var(--ease-soft), padding-left 0.22s var(--ease-out);
}

.cols a:hover {
  color: #fff;
  padding-left: 4px;
}

.cols a.router-link-active {
  color: var(--tama-peach-glow);
}

/* --------------------------------------------------------------- crisis --- */
.crisis {
  border: 1px solid rgba(255, 217, 179, 0.34);
  background: rgba(255, 217, 179, 0.09);
  border-radius: 16px;
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

/* --------------------------------------------------------------- bottom --- */
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
  color: var(--on-night-faint);
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

/* ------------------------------------------------------------- wordmark --- */
.wordmark {
  position: relative;
  z-index: 1;
  margin-top: clamp(1.5rem, 4vw, 3rem);
  /* Crop the lower third of the letterforms against the page edge */
  height: calc(var(--step-7) * 0.6);
  overflow: hidden;
  pointer-events: none;
}

.wordmark span {
  display: block;
  font-family: var(--font-display);
  font-size: var(--step-7);
  font-weight: 700;
  line-height: 0.78;
  letter-spacing: -0.055em;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.16) 0%,
    rgba(255, 217, 179, 0.09) 55%,
    rgba(255, 217, 179, 0) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (min-width: 860px) {
  .top {
    grid-template-columns: 0.95fr 1.35fr;
  }
}
</style>
