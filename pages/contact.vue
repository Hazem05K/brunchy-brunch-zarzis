<script setup lang="ts">
import { localizedSeoLinks } from '~/utils/seo'
definePageMeta({ alias: ['/ar/contact'] })
const config = useRuntimeConfig()
const { t, locale, localizePath } = useLocale()
const localizedLinks = computed(() => localizedSeoLinks('/contact', locale.value, config.public.siteUrl))
const contactPhone = config.public.contactPhone
const contactEmail = config.public.contactEmail
const phoneHref = contactPhone?.replace(/[^\d+]/g, '')
useSeoMeta({
  title: () => t('Contact | Brunchy Brunch Zarzis'),
  description: () => t('Écrivez à Brunchy Brunch Zarzis via notre formulaire de contact sécurisé.'),
  ogTitle: () => t('Contact | Brunchy Brunch Zarzis'),
  ogDescription: () => t('Brunchy Brunch à Zarzis. Envoyez-nous votre demande.'),
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: localizedLinks })
</script>

<template>
  <section class="bg-mist">
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p class="eyebrow">{{ t('Nous sommes à votre écoute') }}</p>
      <h1 class="section-title mt-4">{{ t('Parlons brunch.') }}</h1>
      <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{{ t('Une question, une idée ou simplement envie de nous écrire ? L’équipe Brunchy Brunch est à votre écoute.') }}</p>
    </div>
  </section>
  <section class="mx-auto grid max-w-7xl items-start gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8 lg:py-20">
    <div class="rounded-[1.7rem] border border-slate-100 bg-white p-5 shadow-card sm:p-8">
      <p class="eyebrow">{{ t('Votre message') }}</p>
      <h2 class="section-title mt-3 text-3xl sm:text-4xl">{{ t('Comment pouvons-nous vous aider ?') }}</h2>
      <p class="mb-8 mt-3 leading-7 text-slate-500">{{ t('Écrivez-nous ici. Votre message sera envoyé directement à l’équipe Brunchy Brunch.') }}</p>
      <ContactForm />
    </div>
    <aside class="space-y-4">
      <h2 class="font-display text-2xl text-navy">{{ t('Nous joindre') }}</h2>
      <article class="rounded-2xl border border-[#E9C46A]/50 bg-cream p-5">
        <span class="grid size-11 place-items-center rounded-xl bg-white text-xl text-navy" aria-hidden="true">☎</span>
        <h3 class="mt-4 text-lg text-navy">{{ t('Téléphone') }}</h3>
        <a v-if="contactPhone" :href="`tel:${phoneHref}`" class="mt-1 inline-block font-semibold text-slate-600 hover:text-navy">{{ contactPhone }}</a>
        <p v-else class="mt-1 text-sm text-slate-500">{{ t('Numéro à communiquer') }}</p>
      </article>
      <article class="rounded-2xl border border-[#E9C46A]/50 bg-cream p-5">
        <span class="grid size-11 place-items-center rounded-xl bg-white text-xl text-navy" aria-hidden="true">✉</span>
        <h3 class="mt-4 text-lg text-navy">{{ t('E-mail') }}</h3>
        <a v-if="contactEmail" :href="`mailto:${contactEmail}`" class="mt-1 inline-block break-all font-semibold text-slate-600 hover:text-navy">{{ contactEmail }}</a>
        <p v-else class="mt-1 text-sm text-slate-500">{{ t('Adresse e-mail à communiquer') }}</p>
      </article>
      <div class="rounded-2xl bg-navy p-5 text-white">
        <p class="text-sm font-bold text-sky">{{ t('Pour une commande') }}</p>
        <p class="mt-2 text-sm leading-6 text-blue-100">{{ t('Choisissez votre branche et envoyez une demande directement depuis sa page.') }}</p>
        <NuxtLink :to="localizePath('/branches')" class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-sky">{{ t('Découvrir les branches') }} <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </aside>
  </section>
</template>
