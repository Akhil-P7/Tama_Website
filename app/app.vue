<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

// Site-wide JSON-LD. Emitted on every page so any crawler landing on any
// single URL can identify the organisation, the site, and the app itself.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Tama AI',
            url: `${siteUrl}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/images/tama_mascot_avatar.jpg`,
              width: 889,
              height: 896,
            },
            founder: { '@type': 'Person', name: APP.developer },
            email: APP.email,
            contactPoint: {
              '@type': 'ContactPoint',
              email: APP.email,
              contactType: 'customer support',
              availableLanguage: ['English'],
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: 'Tama AI',
            description: config.public.siteDescription,
            publisher: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en',
          },
          {
            '@type': ['SoftwareApplication', 'MobileApplication'],
            '@id': `${siteUrl}/#app`,
            name: 'Tama — AI Companion & Lifebook Journal',
            alternateName: 'Tama AI',
            applicationCategory: 'LifestyleApplication',
            applicationSubCategory: 'AI Companion, Journal, Wellbeing',
            operatingSystem: 'Android 8.0 and later',
            description: config.public.siteDescription,
            url: `${siteUrl}/`,
            image: `${siteUrl}/images/tama_mascot_avatar.jpg`,
            screenshot: [
              `${siteUrl}/images/tama_open_lifebook.jpg`,
              `${siteUrl}/images/tama_cozy_night.jpg`,
            ],
            softwareVersion: APP.version,
            datePublished: '2026-09-01',
            author: { '@id': `${siteUrl}/#organization` },
            publisher: { '@id': `${siteUrl}/#organization` },
            offers: {
              '@type': 'AggregateOffer',
              offerCount: 2,
              priceCurrency: 'INR',
              lowPrice: '0',
              description:
                'Free tier includes unlimited companion chat and uncapped proactive check-ins. Premium adds unlimited memory recall, the rendered Lifebook, and unlimited Special People.',
            },
            featureList: FEATURES.map((f) => f.title),
            isFamilyFriendly: false,
            contentRating: 'Mature 17+',
            inLanguage: 'en',
            privacyPolicy: `${siteUrl}/privacy`,
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
