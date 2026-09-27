import { createHash } from 'node:crypto'
import { createError, getRequestIP } from 'h3'
import { findBranchById } from '~/data/branches'
import {
  isMailConfigured,
  isRecord,
  isValidTunisianPhone,
  readLimitedJson,
  recordRateLimit,
  sendAdminEmail,
  text,
  verifyRecaptcha,
} from '../utils/form-security'

const recentSubmissions = new Map<string, number>()
const inFlightSubmissions = new Set<string>()
const duplicateWindowMs = 60 * 1000
const maxRecentSubmissions = 5000

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) return false
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Tunis',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  return value >= today
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const ip = getRequestIP(event) || 'unknown'
  const now = Date.now()

  if (!recordRateLimit(ip, now)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const body = await readLimitedJson(event, 8192)

  if (!isRecord(body)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  if (text(body.website)) {
    return { ok: true }
  }

  const name = text(body.name)
  const phone = text(body.phone)
  const email = text(body.email)
  const branchId = text(body.branchId)
  const address = text(body.address)
  const date = text(body.date)
  const time = text(body.time)
  const boxes = typeof body.boxes === 'number' ? body.boxes : Number.NaN
  const description = text(body.description)
  const recaptchaToken = text(body.recaptchaToken)
  const branch = findBranchById(branchId)

  if (
    name.length < 2 || name.length > 100 ||
    !isValidTunisianPhone(phone) ||
    (email.length > 254 || (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) ||
    !branch ||
    address.length < 5 || address.length > 300 ||
    !isValidDate(date) ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time) ||
    !Number.isInteger(boxes) || boxes < 1 || boxes > 30 ||
    description.length < 2 || description.length > 1500 ||
    recaptchaToken.length < 20 || recaptchaToken.length > 4096
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  if (
    !config.recaptchaSecretKey ||
    !isMailConfigured(config)
  ) {
    throw createError({ statusCode: 503, statusMessage: 'Order service unavailable' })
  }

  try {
    if (!await verifyRecaptcha(recaptchaToken, config.recaptchaSecretKey)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) throw error
    console.error('Order request could not be verified by reCAPTCHA.')
    throw createError({ statusCode: 503, statusMessage: 'Order service unavailable' })
  }

  const duplicateKey = createHash('sha256')
    .update([ip, name, phone, branchId, address, date, time, boxes, description].join('\n'))
    .digest('hex')
  const previousSubmission = recentSubmissions.get(duplicateKey)
  if (inFlightSubmissions.has(duplicateKey) || (previousSubmission && now - previousSubmission < duplicateWindowMs)) {
    throw createError({ statusCode: 429, statusMessage: 'Duplicate request' })
  }

  if (recentSubmissions.size >= maxRecentSubmissions) {
    for (const [key, timestamp] of recentSubmissions) {
      if (now - timestamp >= duplicateWindowMs) recentSubmissions.delete(key)
    }
    if (recentSubmissions.size >= maxRecentSubmissions) {
      throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
    }
  }

  inFlightSubmissions.add(duplicateKey)
  try {
    await sendAdminEmail(config, {
      subject: 'Nouvelle demande de livraison — Brunchy Brunch Zarzis',
      text: [
        'Nouvelle demande de commande / livraison',
        '',
        `Branche : ${branch.name}`,
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        ...(email ? [`E-mail : ${email}`] : []),
        `Adresse : ${address}`,
        `Date souhaitée : ${date}`,
        `Heure souhaitée : ${time}`,
        `Nombre de box : ${boxes}`,
        '',
        'Commande / Description :',
        description,
      ].join('\n'),
      replyTo: email || undefined,
    })
  } catch {
    console.error('Order request email could not be sent.')
    throw createError({ statusCode: 503, statusMessage: 'Order service unavailable' })
  } finally {
    inFlightSubmissions.delete(duplicateKey)
  }

  recentSubmissions.set(duplicateKey, now)
  return { ok: true }
})
