import { branches } from './data/branches'

const appBaseURL = process.env.NUXT_APP_BASE_URL || '/'
const normalizedAppBaseURL = appBaseURL.endsWith('/') ? appBaseURL : `${appBaseURL}/`

export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@fontsource/dm-serif-display/latin-400.css',
    '@fontsource/manrope/latin-400.css',
    '@fontsource/manrope/latin-500.css',
    '@fontsource/manrope/latin-600.css',
    '@fontsource/manrope/latin-700.css',
    '@fontsource/manrope/latin-800.css',
    '~/assets/css/main.css',
  ],
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpUser: process.env.SMTP_USER || '',
    smtpPassword: process.env.SMTP_PASSWORD || '',
    mailFrom: process.env.MAIL_FROM || '',
    mailTo: process.env.MAIL_TO || '',
    recaptchaSecretKey: '',
    public: {
      siteUrl: '',
      staticSite: false,
      recaptchaSiteKey: '',
      contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE || '',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || '',
    },
  },
  app: {
    baseURL: normalizedAppBaseURL,
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'theme-color', content: '#022252' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${normalizedAppBaseURL}favicon.svg` }],
    },
  },
  nitro: {
    preset: 'static',
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        },
      },
      '/': { prerender: true },
      '/branches': { prerender: true },
      '/branches/**': { prerender: true },
      '/contact': { prerender: true },
      '/privacy': { prerender: true },
      '/commander': { prerender: true },
      '/api/order': { cors: false },
    },
    prerender: {
      routes: [
        '/sitemap.xml',
        '/robots.txt',
        ...branches.map(branch => `/branches/${branch.slug}`),
      ],
    },
  },
})
