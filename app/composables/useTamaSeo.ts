/**
 * Central SEO + structured-data helper.
 *
 * Every page calls this exactly once. It guarantees that no page can ship
 * without a canonical URL, a unique title/description, Open Graph tags, and
 * JSON-LD — the four things that most often silently break discoverability.
 */

export interface Crumb {
  name: string
  path: string
}

export interface TamaSeoInput {
  /** Page title WITHOUT the site-name suffix — added automatically. */
  title: string
  /** 50–160 characters. Written for humans first, search snippets second. */
  description: string
  /** Absolute path with no trailing slash, e.g. '/features'. Use '/' for home. */
  path: string
  /** Path to a social share image under /images. */
  image?: string
  /** Open Graph object type. */
  type?: 'website' | 'article'
  /** Extra JSON-LD graph nodes for this page. */
  schema?: Record<string, unknown> | Record<string, unknown>[]
  /** Breadcrumb trail, excluding Home (prepended automatically). */
  breadcrumbs?: Crumb[]
  /** ISO date for legal/article pages. */
  datePublished?: string
  dateModified?: string
  /** Suffix the site name onto the <title>. Home page opts out. */
  bareTitle?: boolean
}

export function useTamaSeo(input: TamaSeoInput) {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl as string
  const siteName = config.public.siteName as string

  const path = input.path === '/' ? '/' : input.path.replace(/\/$/, '')
  const canonical = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
  const image = `${siteUrl}${input.image || '/images/og-default.jpg'}`
  const fullTitle = input.bareTitle ? input.title : `${input.title} · ${siteName}`

  useSeoMeta({
    title: fullTitle,
    description: input.description,

    ogType: input.type || 'website',
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogUrl: canonical,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Tama — a soft cloud-like companion with a sprout on its head.',
    ogSiteName: siteName,
    ogLocale: 'en_US',

    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: image,
    twitterImageAlt: 'Tama — your life, remembered.',

    articlePublishedTime: input.datePublished,
    articleModifiedTime: input.dateModified,
  })

  // ---- JSON-LD graph -------------------------------------------------------
  const crumbTrail: Crumb[] = [{ name: 'Home', path: '/' }, ...(input.breadcrumbs || [])]

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: fullTitle,
      description: input.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#app` },
      primaryImageOfPage: image,
      inLanguage: 'en',
      ...(input.datePublished ? { datePublished: input.datePublished } : {}),
      ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: crumbTrail.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.path === '/' ? `${siteUrl}/` : `${siteUrl}${c.path}`,
      })),
    },
  ]

  if (input.schema) {
    graph.push(...(Array.isArray(input.schema) ? input.schema : [input.schema]))
  }

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      },
    ],
  })

  return { canonical, siteUrl }
}
