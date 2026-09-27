import nodemailer from 'nodemailer'
import { createError, getRequestHeader, type H3Event } from 'h3'

const requestHistory = new Map<string, number[]>()
const rateLimitWindowMs = 15 * 60 * 1000
const maxRequestsPerWindow = 5
const maxTrackedIps = 1000

export interface FormMailConfig {
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
  mailFrom: string
  mailTo: string
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function isValidTunisianPhone(value: string) {
  const normalized = value.replace(/[\s().-]/g, '').replace(/^\+/, '')
  const national = normalized.startsWith('216') ? normalized.slice(3) : normalized
  return /^\d{8}$/.test(national) && /^[2-9]/.test(national)
}

export function recordRateLimit(ip: string, now: number) {
  if (!requestHistory.has(ip) && requestHistory.size >= maxTrackedIps) {
    for (const [key, timestamps] of requestHistory) {
      if (timestamps.every(timestamp => now - timestamp >= rateLimitWindowMs)) requestHistory.delete(key)
    }
    if (requestHistory.size >= maxTrackedIps) return false
  }

  const recent = (requestHistory.get(ip) || []).filter(timestamp => now - timestamp < rateLimitWindowMs)
  if (recent.length >= maxRequestsPerWindow) return false
  recent.push(now)
  requestHistory.set(ip, recent)
  return true
}

export async function readLimitedJson(event: H3Event, maxBytes: number) {
  const contentLengthHeader = getRequestHeader(event, 'content-length')
  const contentLength = Number(contentLengthHeader || 0)
  if ((contentLengthHeader && !/^\d+$/.test(contentLengthHeader)) || contentLength > maxBytes) {
    throw createError({ statusCode: 413, statusMessage: 'Request too large' })
  }

  const contentType = getRequestHeader(event, 'content-type') || ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  const chunks: Buffer[] = []
  let size = 0
  let oversized = false
  for await (const chunk of event.node.req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > maxBytes) {
      oversized = true
      continue
    }
    chunks.push(buffer)
  }
  if (oversized) {
    throw createError({ statusCode: 413, statusMessage: 'Request too large' })
  }

  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    return parsed
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }
}

export async function verifyRecaptcha(token: string, secret: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) return false
  const result: unknown = await response.json()
  return isRecord(result) && result.success === true
}

export function isMailConfigured(config: FormMailConfig) {
  return Boolean(
    config.smtpHost &&
    config.smtpUser &&
    config.smtpPassword &&
    config.mailFrom &&
    config.mailTo &&
    Number.isInteger(Number(config.smtpPort)) &&
    Number(config.smtpPort) >= 1 &&
    Number(config.smtpPort) <= 65535
  )
}

export async function sendAdminEmail(
  config: FormMailConfig,
  message: { subject: string; text: string; replyTo?: string },
) {
  const port = Number(config.smtpPort)
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  })
  await transporter.sendMail({
    from: config.mailFrom,
    to: config.mailTo,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  })
}
