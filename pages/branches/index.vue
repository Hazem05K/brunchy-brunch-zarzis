<script setup lang="ts">
import { branches } from '~/data/branches'
import { canonicalUrl } from '~/utils/seo'

const config = useRuntimeConfig()
const canonical = canonicalUrl('/branches', config.public.siteUrl)
useSeoMeta({
  title: 'Nos branches à Zarzis | Brunchy Brunch',
  description: 'Découvrez les branches Classic, VIP, Royal et Family de Brunchy Brunch à Zarzis.',
  ogTitle: 'Nos branches à Zarzis | Brunchy Brunch',
  ogDescription: 'Choisissez votre branche Brunchy Brunch à Zarzis.',
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: canonical ? [{ rel: 'canonical', href: canonical }] : [] })
</script>

<template>
  <section class="bg-mist">
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p class="eyebrow">Brunchy Brunch · Zarzis</p>
      <h1 class="section-title mt-4 max-w-3xl">La bonne adresse pour votre prochaine envie.</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Parcourez nos branches et choisissez votre ambiance. Chaque demande se fait directement depuis sa page.</p>
    </div>
  </section>
  <section class="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
    <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="eyebrow">À vous de jouer</p>
        <h2 class="section-title mt-3 text-3xl sm:text-4xl">Choisissez votre branche</h2>
      </div>
      <p class="max-w-md text-sm leading-6 text-slate-500">Chaque demande est envoyée depuis la page de la branche sélectionnée.</p>
    </div>
    <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <BranchCard v-for="branch in branches" :key="branch.id" :branch="branch" />
    </div>
  </section>
</template>
