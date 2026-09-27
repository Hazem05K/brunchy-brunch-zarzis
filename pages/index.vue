<script setup lang="ts">
import { branches } from '~/data/branches'
import { appPath } from '~/utils/app-path'
import { localizedSeoLinks } from '~/utils/seo'
definePageMeta({ alias: ['/ar'] })

const config = useRuntimeConfig()
const appBaseURL = config.app.baseURL
const { t, locale, localizePath } = useLocale()
const localizedLinks = computed(() => localizedSeoLinks('/', locale.value, config.public.siteUrl))

useSeoMeta({
  title: () => t('Brunchy Brunch Zarzis | Brunch & livraison'),
  description: () => t('Découvrez Brunchy Brunch à Zarzis. Choisissez votre branche et envoyez votre demande de brunch ou de livraison.'),
  ogTitle: () => t('Brunchy Brunch Zarzis'),
  ogDescription: () => t('Brunch, repas et demandes de livraison à Zarzis, Médenine.'),
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({
  link: localizedLinks,
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: t('Brunchy Brunch Zarzis'),
      areaServed: [
        { '@type': 'City', name: 'Zarzis' },
        { '@type': 'AdministrativeArea', name: 'Médenine' },
        { '@type': 'Country', name: 'Tunisie' },
      ],
      servesCuisine: ['Brunch'],
    })),
  }],
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-mist">
      <div class="absolute -right-24 -top-32 size-96 rounded-full bg-sky/60 blur-3xl" aria-hidden="true" />
      <div class="absolute -bottom-40 left-1/4 size-80 rounded-full bg-yolk/25 blur-3xl" aria-hidden="true" />
      <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-8 lg:py-24">
        <div class="max-w-2xl">
          <p class="inline-flex items-center gap-2 rounded-full border border-yolk bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-navy">
            <span class="size-2 rounded-full bg-orange" aria-hidden="true" /> {{ t('Brunchy Brunch · Zarzis') }}
          </p>
          <h1 class="mt-7 font-display text-5xl font-normal leading-[1.06] tracking-[-0.035em] text-navy sm:text-6xl lg:text-7xl">
            {{ t('Le plaisir du brunch,') }} <span class="underline decoration-orange decoration-4 underline-offset-8">{{ t('à votre rythme.') }}</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {{ t('Une envie de brunch ou de repas ? Choisissez votre branche à Zarzis et envoyez-nous votre demande de livraison.') }}
          </p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <NuxtLink :to="localizePath('/branches')" class="button-primary">{{ t('Choisir ma branche') }} <span aria-hidden="true">↗</span></NuxtLink>
          </div>
          <div class="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-500">
            <span><span class="me-2 text-navy" aria-hidden="true">✳</span>{{ t('À Zarzis') }}</span>
            <span><span class="me-2 text-navy" aria-hidden="true">✳</span>{{ t('Demande simple') }}</span>
            <span><span class="me-2 text-navy" aria-hidden="true">✳</span>{{ t('Confirmation par notre équipe') }}</span>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-[34rem]">
          <div class="absolute -left-4 top-12 z-10 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-7">
            <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{{ t('Une belle journée') }}</span>
            <span class="mt-1 block text-sm font-extrabold text-navy">{{ t('commence ici') }} <span class="text-orange">✳</span></span>
          </div>
          <div class="relative aspect-[0.92] overflow-hidden rounded-[2.6rem] bg-navy shadow-[0_35px_90px_rgba(2,34,82,0.2)] sm:aspect-square">
            <img
              class="absolute inset-0 size-full object-cover"
              :src="appPath('/images/brunch-illustrative.jpg', appBaseURL)"
              :alt="t('Photo illustrative d’une table de brunch, sans lien avec le menu réel de Brunchy Brunch')"
              width="1400"
              height="933"
              fetchpriority="high"
            />
            <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/85 to-transparent" aria-hidden="true" />
            <span class="absolute bottom-5 right-5 rounded-xl border border-white/25 bg-navy/75 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur">
              {{ t('Photo illustrative · non contractuelle') }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-28">
      <div>
        <p class="eyebrow">{{ t('Notre esprit') }}</p>
        <h2 class="section-title mt-4">{{ t('Un moment à savourer, simplement.') }}</h2>
      </div>
      <div class="max-w-3xl">
        <p class="text-lg leading-8 text-slate-600">
          {{ t('Brunchy Brunch vous accueille à Zarzis autour du brunch et des repas. Retrouvez la branche qui vous convient, partagez ce que vous souhaitez commander et indiquez votre adresse ainsi que le moment souhaité.') }}
        </p>
        <p class="mt-4 text-base leading-7 text-slate-500">
          {{ t('Chaque demande est vérifiée par notre équipe avant confirmation. Les menus, disponibilités et conditions de livraison sont communiqués par la branche choisie.') }}
        </p>
      </div>
    </section>

    <section class="bg-cream">
      <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="eyebrow">{{ t('Tout près de vous') }}</p>
            <h2 class="section-title mt-4">{{ t('Découvrez nos branches') }}</h2>
            <p class="mt-3 max-w-xl leading-7 text-slate-500">{{ t('Choisissez une branche pour découvrir son univers et lui envoyer directement votre demande.') }}</p>
          </div>
          <NuxtLink :to="localizePath('/branches')" class="link-arrow">{{ t('Toutes nos branches') }} <span aria-hidden="true">→</span></NuxtLink>
        </div>
        <div class="mt-8">
          <BranchCarousel :branches="branches" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div class="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-white sm:px-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:px-14">
        <div class="pointer-events-none absolute -right-16 -top-28 size-72 rounded-full border border-sky/30" aria-hidden="true" />
        <div class="pointer-events-none absolute -right-4 -top-16 size-48 rounded-full border border-sky/20" aria-hidden="true" />
        <div class="max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-yolk">{{ t('À vous de choisir') }}</p>
          <h2 class="mt-4 font-display text-3xl font-normal tracking-normal sm:text-4xl">{{ t('Une envie de brunch ?') }}</h2>
          <p class="mt-4 leading-7 text-blue-100">{{ t('Choisissez votre branche et envoyez-lui directement votre demande. L’équipe vous recontactera pour confirmer les détails.') }}</p>
        </div>
        <NuxtLink :to="localizePath('/branches')" class="button-light mt-8 shrink-0 lg:ms-8 lg:mt-0">{{ t('Voir les branches') }} <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </div>
</template>
