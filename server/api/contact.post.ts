import { createError, getRequestIP } from 'h3'
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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const ip = getRequestIP(event) || 'unknown'

  if (!recordRateLimit(ip, Date.now())) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const body = await readLimitedJson(event, 6144)
  if (!isRecord(body)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  if (text(body.website)) {
    return { ok: true }
  }

  const name = text(body.name)
  const phone = text(body.phone)
  const email = text(body.email)
  const message = text(body.message)
  const recaptchaToken = text(body.recaptchaToken)
  const hasInvalidEmailType = body.email !== undefined && typeof body.email !== 'string'

  if (
    name.length < 2 || name.length > 100 ||
    !isValidTunisianPhone(phone) ||
    hasInvalidEmailType ||
    email.length > 254 ||
    (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
    message.length < 10 || message.length > 2000 ||
    recaptchaToken.length < 20 || recaptchaToken.length > 4096
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  if (!config.recaptchaSecretKey || !isMailConfigured(config)) {
    throw createError({ statusCode: 503, statusMessage: 'Contact service unavailable' })
  }

  try {
    if (!await verifyRecaptcha(recaptchaToken, config.recaptchaSecretKey)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) throw error
    console.error('Contact message could not be verified by reCAPTCHA.')
    throw createError({ statusCode: 503, statusMessage: 'Contact service unavailable' })
  }

  try {
    await sendAdminEmail(config, {
      subject: 'Nouveau message de contact — Brunchy Brunch Zarzis',
      text: [
        'Nouveau message de contact',
        '',
        `Nom : ${name}`,
        `Téléphone : ${phone}`,
        ...(email ? [`E-mail : ${email}`] : []),
        '',
        'Message :',
        message,
      ].join('\n'),
      replyTo: email || undefined,
    })
  } catch {
    console.error('Contact message email could not be sent.')
    throw createError({ statusCode: 503, statusMessage: 'Contact service unavailable' })
  }

  return { ok: true }
})
