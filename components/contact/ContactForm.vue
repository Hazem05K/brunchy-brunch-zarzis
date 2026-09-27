<script setup lang="ts">
const config = useRuntimeConfig()
const siteKey = config.public.recaptchaSiteKey
const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: '',
  website: '',
})
const recaptchaToken = ref('')
const captcha = ref<{ reset: () => void } | null>(null)
const loading = ref(false)
const feedback = ref<{ type: 'success' | 'error'; text: string }>()
const configReady = computed(() => Boolean(siteKey))

async function submitContact() {
  if (!configReady.value || !recaptchaToken.value || loading.value) return

  feedback.value = undefined
  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, recaptchaToken: recaptchaToken.value },
    })
    feedback.value = {
      type: 'success',
      text: 'Votre message a bien été envoyé. Merci de nous avoir contactés.',
    }
    Object.assign(form, { name: '', phone: '', email: '', message: '', website: '' })
    recaptchaToken.value = ''
    captcha.value?.reset()
  } catch (error) {
    const status = error && typeof error === 'object' && 'statusCode' in error
      ? error.statusCode
      : undefined
    feedback.value = {
      type: 'error',
      text: status === 429
        ? 'Trop de messages ont été envoyés récemment. Veuillez réessayer un peu plus tard.'
        : status === 503
          ? 'Le service de contact est momentanément indisponible. Veuillez réessayer plus tard.'
          : 'Votre message n’a pas pu être envoyé. Vérifiez les informations et réessayez.',
    }
    recaptchaToken.value = ''
    captcha.value?.reset()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submitContact">
    <div v-if="feedback" :class="feedback.type === 'success' ? 'notice-success' : 'notice-error'" role="status" aria-live="polite">
      {{ feedback.text }}
    </div>
    <div v-if="!configReady" class="notice-info" role="status">
      Le formulaire sera disponible après la configuration de reCAPTCHA.
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <label class="field-label">
        <span>Nom et prénom <span aria-hidden="true">*</span></span>
        <input v-model.trim="form.name" class="field-input" name="name" autocomplete="name" maxlength="100" required>
      </label>
      <label class="field-label">
        <span>Téléphone <span aria-hidden="true">*</span></span>
        <input v-model.trim="form.phone" class="field-input" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" placeholder="+216 00 000 000" required>
      </label>
      <label class="field-label sm:col-span-2">
        <span>E-mail <span class="font-normal text-slate-400">(facultatif)</span></span>
        <input v-model.trim="form.email" class="field-input" name="email" type="email" autocomplete="email" maxlength="254">
      </label>
      <label class="field-label sm:col-span-2">
        <span>Votre message <span aria-hidden="true">*</span></span>
        <textarea v-model.trim="form.message" class="field-input min-h-40 resize-y" name="message" minlength="10" maxlength="2000" placeholder="Comment pouvons-nous vous aider ?" required />
        <span class="mt-1 text-xs font-normal text-slate-400">{{ form.message.length }}/2000 caractères</span>
      </label>
    </div>

    <label class="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      Ne pas remplir ce champ
      <input v-model="form.website" name="website" tabindex="-1" autocomplete="off">
    </label>

    <RecaptchaCheckbox v-if="configReady" ref="captcha" v-model="recaptchaToken" :site-key="siteKey" />
    <p class="text-xs leading-5 text-slate-500">
      Votre message sera envoyé à l’équipe Brunchy Brunch uniquement pour répondre à votre demande.
      <NuxtLink to="/privacy" class="font-semibold text-navy underline underline-offset-2">Confidentialité</NuxtLink>
    </p>
    <button class="button-primary w-full sm:w-auto" type="submit" :disabled="loading || !configReady || !recaptchaToken">
      {{ loading ? 'Envoi en cours…' : 'Envoyer mon message' }}
      <span v-if="!loading" aria-hidden="true">→</span>
    </button>
  </form>
</template>

<style scoped>
.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  color: #022252;
  font-size: 0.875rem;
  font-weight: 700;
}
.field-input {
  width: 100%;
  border: 1px solid #dce8f1;
  border-radius: 0.85rem;
  background: #fff;
  padding: 0.8rem 0.9rem;
  color: #173759;
  font-size: 1rem;
  font-weight: 400;
}
.field-input:focus {
  border-color: #f4a261;
  outline: 2px solid #afe0fe;
  outline-offset: 1px;
}
.notice-success,
.notice-error,
.notice-info {
  border-radius: 0.85rem;
  padding: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}
.notice-success { background: #edf8f1; color: #17653a; }
.notice-error { background: #fff1f0; color: #9b2525; }
.notice-info { background: #fff5e6; color: #173759; }
</style>
