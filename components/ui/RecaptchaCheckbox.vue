<script setup lang="ts">
const props = defineProps<{
  siteKey: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [token: string]
}>()

declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, options: {
        sitekey: string
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      }) => number
      reset: (widgetId?: number) => void
    }
    onBrunchyRecaptchaReady?: () => void
  }
}

const container = ref<HTMLElement>()
const widgetId = ref<number>()
const loadError = ref(false)
let scriptPromise: Promise<void> | undefined

function loadApi() {
  if (window.grecaptcha) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  const pendingScript = new Promise<void>((resolve, reject) => {
    window.onBrunchyRecaptchaReady = () => {
      if (window.grecaptcha) resolve()
      else reject(new Error('reCAPTCHA API did not initialize'))
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onBrunchyRecaptchaReady&render=explicit'
    script.async = true
    script.defer = true
    script.dataset.recaptcha = 'true'
    script.onerror = () => {
      script.remove()
      reject(new Error('reCAPTCHA script could not load'))
    }
    document.head.append(script)
  })

  scriptPromise = pendingScript.catch((error: unknown) => {
    scriptPromise = undefined
    throw error
  })
  return scriptPromise
}

function reset() {
  if (widgetId.value !== undefined) window.grecaptcha?.reset(widgetId.value)
  emit('update:modelValue', '')
}

defineExpose({ reset })

onMounted(async () => {
  try {
    await loadApi()
    if (!container.value || !window.grecaptcha) {
      throw new Error('reCAPTCHA widget could not be mounted')
    }
    widgetId.value = window.grecaptcha.render(container.value, {
      sitekey: props.siteKey,
      callback: token => emit('update:modelValue', token),
      'expired-callback': reset,
      'error-callback': reset,
    })
  } catch {
    loadError.value = true
  }
})
</script>

<template>
  <div class="min-h-[78px]">
    <div ref="container" />
    <p v-if="loadError" class="mt-2 text-sm text-red-700" role="alert">
      Impossible de charger reCAPTCHA. Actualisez la page ou réessayez plus tard.
    </p>
  </div>
</template>
