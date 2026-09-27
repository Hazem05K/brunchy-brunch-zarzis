import { translations, type Locale } from '~/utils/translations'

export function useLocale() {
  const route = useRoute()
  const locale = computed<Locale>(() => route.path === '/ar' || route.path.startsWith('/ar/') ? 'ar' : 'fr')

  const direction = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')

  function localizePath(path: string, targetLocale: Locale = locale.value) {
    const hashIndex = path.indexOf('#')
    const hash = hashIndex >= 0 ? path.slice(hashIndex) : ''
    const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path
    const queryIndex = withoutHash.indexOf('?')
    const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : ''
    const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash
    const currentPath = pathname || route.path
    const frenchPath = currentPath.replace(/^\/ar(?=\/|$)/, '') || '/'
    const localizedPath = targetLocale === 'ar'
      ? frenchPath === '/' ? '/ar' : `/ar${frenchPath}`
      : frenchPath

    return `${localizedPath}${query}${hash}`
  }

  function t(source: string, values: Record<string, string | number> = {}) {
    const message = locale.value === 'ar' ? (translations[source] || source) : source
    return message.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`))
  }

  function toggleLocale() {
    return navigateTo(localizePath(route.fullPath, locale.value === 'fr' ? 'ar' : 'fr'))
  }

  return { locale, direction, t, localizePath, toggleLocale }
}
