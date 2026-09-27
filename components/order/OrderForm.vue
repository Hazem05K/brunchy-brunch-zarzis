<script setup lang="ts">
const props = defineProps<{
  branchId: string
  branchName: string
}>()

const config = useRuntimeConfig()
const siteKey = config.public.recaptchaSiteKey
const form = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  date: '',
  time: '',
  boxes: 1,
  description: '',
  website: '',
})
const loading = ref(false)
const feedback = ref<{ type: 'success' | 'error'; text: string }>()
const recaptchaToken = ref('')
const captcha = ref<{ reset: () => void } | null>(null)

const minDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Tunis' })
const configReady = computed(() => Boolean(siteKey))

async function submitOrder() {
  if (!configReady.value || !recaptchaToken.value || loading.value) return

  feedback.value = undefined
  loading.value = true
  try {
    await $fetch('/api/order', {
      method: 'POST',
      body: { ...form, branchId: props.branchId, recaptchaToken: recaptchaToken.value },
    })
    feedback.value = {
      type: 'success',
      text: 'Votre demande a bien été envoyée. Brunchy Brunch va prendre contact avec vous pour confirmer votre commande et les détails de livraison.',
    }
    Object.assign(form, {
      name: '', phone: '', email: '', address: '', date: '',
      time: '', boxes: 1, description: '', website: '',
    })
    recaptchaToken.value = ''
    captcha.value?.reset()
  } catch (error) {
    const status = error && typeof error === 'object' && 'statusCode' in error
      ? error.statusCode
      : undefined
    feedback.value = {
      type: 'error',
      text: status === 429
        ? 'Trop de demandes ont été envoyées depuis cet appareil. Veuillez réessayer un peu plus tard.'
        : status === 503
          ? 'Le service de demande est momentanément indisponible. Veuillez réessayer plus tard ou nous contacter.'
          : 'Votre demande n’a pas pu être envoyée. Vérifiez les informations et réessayez.',
    }
    recaptchaToken.value = ''
    captcha.value?.reset()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submitOrder">
    <input type="hidden" name="branchId" :value="branchId">
    <div v-if="feedback" :class="feedback.type === 'success' ? 'notice-success' : 'notice-error'" role="status" aria-live="polite">
      {{ feedback.text }}
    </div>
    <div v-if="!configReady" class="notice-info" role="status">
      Le formulaire de demande pour {{ branchName }} sera disponible après la configuration de reCAPTCHA. Vous pouvez nous contacter pour toute question.
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
      <label class="field-label">
        <span>E-mail <span class="font-normal text-slate-400">(facultatif)</span></span>
        <input v-model.trim="form.email" class="field-input" name="email" type="email" autocomplete="email" maxlength="254">
      </label>
      <label class="field-label">
        <span>Nombre de box <span aria-hidden="true">*</span></span>
        <input v-model.number="form.boxes" class="field-input" name="boxes" type="number" min="1" max="30" inputmode="numeric" required>
      </label>
      <label class="field-label sm:col-span-2">
        <span>Adresse de livraison <span aria-hidden="true">*</span></span>
        <textarea v-model.trim="form.address" class="field-input min-h-24 resize-y" name="address" autocomplete="street-address" maxlength="300" required />
      </label>
      <label class="field-label">
        <span>Date souhaitée <span aria-hidden="true">*</span></span>
        <input v-model="form.date" class="field-input" name="date" type="date" :min="minDate" required>
      </label>
      <label class="field-label">
        <span>Heure souhaitée <span aria-hidden="true">*</span></span>
        <input v-model="form.time" class="field-input" name="time" type="time" required>
      </label>
      <label class="field-label sm:col-span-2">
        <span>Votre commande <span aria-hidden="true">*</span></span>
        <textarea v-model.trim="form.description" class="field-input min-h-32 resize-y" name="description" maxlength="1500" placeholder="Indiquez ce que vous souhaitez commander..." required />
        <span class="mt-1 text-xs font-normal text-slate-400">{{ form.description.length }}/1500 caractères</span>
      </label>
    </div>

    <label class="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      Ne pas remplir ce champ
      <input v-model="form.website" name="website" tabindex="-1" autocomplete="off">
    </label>

    <RecaptchaCheckbox v-if="configReady" ref="captcha" v-model="recaptchaToken" :site-key="siteKey" />
    <p class="text-xs leading-5 text-slate-500">
      Les informations fournies sont utilisées uniquement pour traiter votre demande. L’envoi d’une demande ne confirme pas la commande.
      <NuxtLink to="/privacy" class="font-semibold text-navy underline underline-offset-2">En savoir plus</NuxtLink>
    </p>
    <button class="button-primary w-full sm:w-auto" type="submit" :disabled="loading || !configReady || !recaptchaToken">
      {{ loading ? 'Envoi en cours…' : 'Commander' }}
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
