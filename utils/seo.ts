export function canonicalUrl(path: string, siteUrl: string) {
  if (!siteUrl) return undefined
  return new URL(path, `${siteUrl.replace(/\/+$/, '')}/`).toString()
}
