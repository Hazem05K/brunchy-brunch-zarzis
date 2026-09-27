<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
const isNotFound = computed(() => props.error.statusCode === 404)
useSeoMeta({
  title: () => isNotFound.value ? 'Page introuvable | Brunchy Brunch Zarzis' : 'Une erreur est survenue | Brunchy Brunch Zarzis',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <section class="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-5 py-20 text-center">
    <div>
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-[#397FB2]">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-4xl font-black tracking-tight text-navy">{{ isNotFound ? 'Cette page reste à trouver.' : 'Un petit contretemps.' }}</h1>
      <p class="mx-auto mt-4 max-w-lg leading-7 text-slate-600">{{ isNotFound ? 'Le lien est peut-être incorrect ou la page a été déplacée.' : 'Veuillez réessayer dans un instant.' }}</p>
      <NuxtLink to="/" class="button-primary mt-8">Retour à l’accueil <span aria-hidden="true">→</span></NuxtLink>
    </div>
  </section>
</template>
