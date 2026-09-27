export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const sitemap = config.public.siteUrl ? `Sitemap: ${config.public.siteUrl.replace(/\/+$/, '')}/sitemap.xml\n` : ''
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /api/\n${sitemap}`
})
