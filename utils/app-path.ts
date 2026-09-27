export function appPath(path: string, baseURL: string) {
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`
  return `${normalizedBaseURL}${path.replace(/^\/+/, '')}`
}
