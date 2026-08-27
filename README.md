# 🌱 Tama AI — Website

> **[usetama.me](https://usetama.me)** · Marketing & compliance website for Tama AI

Tama is an AI companion that listens to your day, remembers the people who matter, quietly notices when something feels off, and compiles your life into a beautiful evolving journal — your Lifebook. No romantic roleplay. No ads. Care is never paywalled.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Nuxt 4 / Vue 3 |
| **Rendering** | Static Site Generation (SSG) — fully pre-rendered HTML |
| **Typography** | Fraunces (display) + Inter (body) via Google Fonts |
| **Hosting** | Any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages) |

## Project Structure

```
app/
├── assets/css/main.css     # Design system (870+ lines) — tokens from Android app
├── components/             # SiteHeader, SiteFooter, PageHero, CtaBand, StoreBadge
├── composables/            # useTamaSeo (SEO/JSON-LD), useReveal (scroll animations)
├── layouts/default.vue     # Shell with skip-link, header, main, footer
├── pages/                  # 16 routes (see below)
└── utils/siteData.ts       # Single source of truth for all site content
public/
├── images/                 # Mascot artwork and app screenshots
├── robots.txt              # Crawler rules (allows all bots + AI crawlers)
├── sitemap.xml             # All canonical routes
├── manifest.webmanifest    # PWA manifest
└── llms.txt                # Machine-readable summary for LLM crawlers
```

## Routes

| Route | Page |
|-------|------|
| `/` | Marketing homepage |
| `/features` | Full v1 feature breakdown |
| `/lifebook` | The Lifebook deep-dive |
| `/pricing` | Free vs Premium comparison |
| `/about` | Mission, principles & creator bio |
| `/safety` | Trust & safety whitepaper |
| `/memory` | How active memory recall works |
| `/privacy` | Full privacy policy |
| `/terms` | Terms of service |
| `/data-safety` | Visual data safety summary |
| `/delete-account` | Account deletion instructions |
| `/support` | FAQ & contact |
| `/updates` | Changelog & release notes |
| `/press` | Press kit & media assets |
| `/for-agents` | Machine-readable product summary |
| `/*` | Custom 404 |

## Development

```bash
# Install dependencies
npm install

# Dev server with hot-reload
npm run dev

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## Deploy

```bash
npm run generate
# Upload .output/public/ to any static host
```

## Author

**Akhil Pandey** · [akhilpandey.r15@gmail.com](mailto:akhilpandey.r15@gmail.com)

## License

All rights reserved. Tama name, mascot artwork, and website content © 2026 Akhil Pandey.
