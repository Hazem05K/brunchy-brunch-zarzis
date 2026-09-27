import { branches } from '~/data/branches'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const base = config.public.siteUrl.replace(/\/+$/, '')
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  if (!base) {
    setResponseHeader(event, 'cache-control', 'no-store')
    return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
  }

  const paths = [
    '/',
    '/branches',
    ...branches.map(branch => `/branches/${branch.slug}`),
    '/commander',
    '/contact',
    '/privacy',
  ]
  const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path.replace(/^\/+/, ''), `${base}/`).toString())}</loc></url>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '\'': '&apos;',
    '"': '&quot;',
  })[character] || character)
}
