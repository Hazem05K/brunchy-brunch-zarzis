import type { Locale } from '~/utils/translations'

export function canonicalUrl(path: string, siteUrl: string) {
  if (!siteUrl) return undefined
  return new URL(path.replace(/^\/+/, ''), `${siteUrl.replace(/\/+$/, '')}/`).toString()
}

export function localizedSeoLinks(path: string, locale: Locale, siteUrl: string) {
  if (!siteUrl) return []

  const frenchPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const arabicPath = frenchPath === '/' ? '/ar' : `/ar${frenchPath}`
  const frenchUrl = canonicalUrl(frenchPath, siteUrl)
  const arabicUrl = canonicalUrl(arabicPath, siteUrl)
  const canonical = canonicalUrl(locale === 'ar' ? arabicPath : frenchPath, siteUrl)

  if (!canonical || !frenchUrl || !arabicUrl) return []

  return [
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', hreflang: 'fr-TN', href: frenchUrl },
    { rel: 'alternate', hreflang: 'ar-TN', href: arabicUrl },
    { rel: 'alternate', hreflang: 'x-default', href: frenchUrl },
  ]
}
