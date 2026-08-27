// Nuxt config — Tama AI marketing + compliance site (usetama.me)
//
// Rendering strategy: full static generation (`npm run generate`).
// Every route is pre-rendered to a real .html file at build time, so crawlers
// that do not execute JavaScript (GPTBot, ClaudeBot, PerplexityBot, Bingbot's
// non-JS pass, social-card scrapers) receive complete content. Vue then
// hydrates on top for transitions and scroll animations.

const SITE_URL = 'https://usetama.me'
const SITE_NAME = 'Tama AI'
const SITE_DESC =
  'Tama is an AI companion that listens to your day, remembers the people who matter, quietly notices when something feels off, and compiles your life into a beautiful evolving journal — your Lifebook. No romantic roleplay. No ads. Never paywalls the care.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // SSR must stay on — it is what makes prerendering to static HTML possible.
  ssr: true,

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      siteName: SITE_NAME,
      siteDescription: SITE_DESC,
      supportEmail: 'akhilpandey.r15@gmail.com',
      developerName: 'Akhil Pandey',
      packageName: 'com.tama.app',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/',
        '/features',
        '/lifebook',
        '/pricing',
        '/safety',
        '/memory',
        '/privacy',
        '/data-safety',
        '/terms',
        '/delete-account',
        '/support',
        '/about',
        '/updates',
        '/press',
        '/for-agents',
        '/404.html',
      ],
    },
  },

  // Static hosts serve /privacy/index.html for /privacy. Trailing-slash
  // consistency avoids duplicate-URL dilution in search indexes.
  experimental: {
    payloadExtraction: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    baseURL: '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/tama_mascot_avatar.jpg' },
        { rel: 'apple-touch-icon', href: '/images/tama_mascot_avatar.jpg' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#081241' },
        { name: 'author', content: 'Akhil Pandey' },
        { name: 'publisher', content: 'Akhil Pandey' },
        { name: 'apple-mobile-web-app-title', content: 'Tama AI' },
        { name: 'application-name', content: 'Tama AI' },
        { name: 'format-detection', content: 'telephone=no' },
        // Explicitly invite indexing and AI ingestion of this public marketing site.
        {
          name: 'robots',
          content:
            'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        },
        { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large' },
      ],
    },
  },

  features: {
    inlineStyles: false,
  },
})
