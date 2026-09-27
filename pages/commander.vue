<script setup lang="ts">
import { branches } from '~/data/branches'
import { localizedSeoLinks } from '~/utils/seo'
definePageMeta({ alias: ['/ar/commander'] })

const config = useRuntimeConfig()
const { t, locale } = useLocale()
const localizedLinks = computed(() => localizedSeoLinks('/commander', locale.value, config.public.siteUrl))
useSeoMeta({
  title: () => t('Choisir une branche | Brunchy Brunch Zarzis'),
  description: () => t('Choisissez la branche Brunchy Brunch à Zarzis à laquelle adresser votre demande de commande ou de livraison.'),
  ogTitle: () => t('Choisir une branche | Brunchy Brunch Zarzis'),
  ogDescription: () => t('Chaque demande est envoyée directement à la branche choisie.'),
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: localizedLinks })
</script>

<template>
  <section class="bg-mist">
    <div class="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
      <p class="eyebrow">{{ t('Une envie de brunch ?') }}</p>
      <h1 class="section-title mt-4 max-w-3xl">{{ t('Choisissez votre branche') }}</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{{ t('Les demandes se font directement depuis la page de la branche concernée, pour que votre message arrive à la bonne équipe.') }}</p>
    </div>
  </section>
  <section class="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <BranchCard v-for="branch in branches" :key="branch.id" :branch="branch" />
    </div>
  </section>
</template>
