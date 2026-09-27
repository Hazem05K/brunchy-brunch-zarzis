<script setup lang="ts">
import { findBranchBySlug } from '~/data/branches'
import { products } from '~/data/products'
import { appPath } from '~/utils/app-path'
import { localizedSeoLinks } from '~/utils/seo'
definePageMeta({ alias: ['/ar/branches/:slug'] })

const route = useRoute()
const config = useRuntimeConfig()
const appBaseURL = config.app.baseURL
const { t, locale, localizePath } = useLocale()
const branch = computed(() => findBranchBySlug(String(route.params.slug)))
if (!branch.value) {
  throw createError({ statusCode: 404, statusMessage: 'Branche introuvable' })
}

const branchProducts = computed(() => products.filter(product => product.branchId === branch.value?.id && product.available !== false))
const menuIdeas = ['Omelette', '2 pancakes', 'Yaourt gourmand', 'Box brunch']
const localizedLinks = computed(() => localizedSeoLinks(`/branches/${branch.value?.slug || ''}`, locale.value, config.public.siteUrl))
useSeoMeta({
  title: () => t('{name} | Brunchy Brunch Zarzis', { name: branch.value?.name || '' }),
  description: () => t('Informations et demande de livraison auprès de {name} à Zarzis.', { name: branch.value?.name || '' }),
  ogTitle: () => t('{name} | Brunchy Brunch Zarzis', { name: branch.value?.name || '' }),
  ogDescription: () => t('Contactez {name} pour votre demande de brunch ou de livraison.', { name: branch.value?.name || '' }),
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: localizedLinks })
</script>

<template>
  <div v-if="branch">
    <section class="bg-mist">
      <div class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-14">
        <div>
          <NuxtLink :to="localizePath('/branches')" class="link-arrow text-sm"><span aria-hidden="true">←</span> {{ t('Toutes les branches') }}</NuxtLink>
          <p class="eyebrow mt-8">{{ t('Brunchy Brunch · Zarzis') }}</p>
          <h1 class="section-title mt-4 max-w-3xl">{{ branch.name }}</h1>
          <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{{ branch.description ? t(branch.description) : t('Les informations de cette branche seront ajoutées dès qu’elles auront été confirmées.') }}</p>
          <NuxtLink :to="localizePath('#demande')" class="button-primary mt-8">{{ t('Commander auprès de cette branche') }} <span aria-hidden="true">↗</span></NuxtLink>
          <p v-if="!config.public.staticSite" class="mt-3 text-xs text-slate-500">{{ t('La demande est adressée directement à {name}.', { name: branch.name }) }}</p>
          <p v-else class="mt-3 text-xs text-slate-500">{{ t('L’envoi des demandes est désactivé sur cette version statique du site.') }}</p>
        </div>
        <figure class="relative isolate aspect-[1.25] overflow-hidden rounded-[2rem] bg-navy shadow-card">
          <img
            class="size-full object-cover"
            :src="appPath(branch.image || '/images/brunch-illustrative.jpg', appBaseURL)"
            :alt="t('Photo culinaire illustrative de {name}, ne représentant pas son menu réel', { name: branch.name })"
            width="900"
            height="600"
            fetchpriority="high"
          >
          <figcaption class="absolute bottom-4 right-4 rounded-xl border border-white/25 bg-navy/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
            {{ t('Photo illustrative · non contractuelle') }}
          </figcaption>
        </figure>
      </div>
    </section>
    <BranchGallery :branch-name="branch.name" :photos="branch.gallery || []" />
    <section class="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <div>
        <p class="eyebrow">{{ t('Le menu') }}</p>
        <h2 class="section-title mt-3 text-3xl sm:text-4xl">{{ t('À la carte chez {name}', { name: branch.name }) }}</h2>
        <p v-if="branchProducts.length === 0" class="mt-3 text-sm leading-6 text-slate-500">
          {{ t('Idées de menu à confirmer avec Brunchy Brunch.') }}
        </p>
        <ul v-if="branchProducts.length === 0" class="menu-list mt-5 max-w-3xl divide-y divide-[#E9C46A]/60 rounded-2xl border border-[#E9C46A]/60 bg-white px-5 sm:px-7">
          <li v-for="(item, index) in menuIdeas" :key="item" class="flex items-center gap-4 py-4 sm:py-5">
            <span class="grid size-9 shrink-0 place-items-center rounded-full bg-cream font-display text-lg text-navy" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="font-display text-xl text-navy sm:text-2xl">{{ t(item) }}</span>
          </li>
        </ul>
        <ul v-else class="menu-list mt-5 max-w-3xl divide-y divide-[#E9C46A]/60 rounded-2xl border border-[#E9C46A]/60 bg-white px-5 sm:px-7">
          <li v-for="product in branchProducts" :key="product.id" class="rounded-2xl border border-slate-100 p-5">
            <div class="flex items-baseline justify-between gap-4 py-4 sm:py-5">
              <div>
                <h3 class="font-display text-xl text-navy sm:text-2xl">{{ t(product.name) }}</h3>
                <p v-if="product.description" class="mt-1 text-sm leading-6 text-slate-500">{{ t(product.description) }}</p>
              </div>
              <p v-if="product.price !== undefined" class="shrink-0 font-semibold text-navy">{{ product.price.toFixed(2) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section id="demande" class="scroll-mt-8 bg-cream">
      <div class="mx-auto grid max-w-7xl items-start gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8 lg:py-20">
        <div class="rounded-[1.7rem] border border-slate-100 bg-white p-5 shadow-card sm:p-8">
          <div class="mb-8 border-b border-slate-100 pb-6">
            <p class="eyebrow">{{ t('Votre demande part d’ici') }}</p>
            <h2 class="section-title mt-3 text-3xl sm:text-4xl">{{ t('Écrivez à {name}', { name: branch.name }) }}</h2>
            <p class="mt-3 leading-7 text-slate-500">{{ t('La branche est déjà sélectionnée. Renseignez votre demande et elle apparaîtra dans l’e-mail envoyé à notre équipe.') }}</p>
          </div>
          <OrderForm :branch-id="branch.id" :branch-name="branch.name" />
        </div>
        <aside class="rounded-[1.7rem] bg-navy p-7 text-white">
          <span class="text-sm font-bold uppercase tracking-[0.18em] text-sky">{{ t('La suite') }}</span>
          <h2 class="mt-4 font-display text-2xl font-normal">{{ t('On s’occupe de votre demande.') }}</h2>
          <ol v-if="!config.public.staticSite" class="mt-5 space-y-4 text-sm leading-6 text-blue-100">
            <li><span class="mr-2 font-bold text-sky">01</span>{{ t('Votre demande est envoyée à cette branche.') }}</li>
            <li><span class="mr-2 font-bold text-sky">02</span>{{ t('L’équipe vérifie la disponibilité et les détails.') }}</li>
            <li><span class="mr-2 font-bold text-sky">03</span>{{ t('La branche vous recontacte pour confirmer.') }}</li>
          </ol>
          <p v-else class="mt-5 text-sm leading-6 text-blue-100">{{ t('Ce site est hébergé sous forme de fichiers statiques et ne dispose pas de service d’envoi. Contactez-nous via les coordonnées affichées sur la page Contact.') }}</p>
          <p class="mt-6 border-t border-white/15 pt-5 text-xs leading-5 text-blue-100">{{ t('L’envoi de la demande ne confirme pas automatiquement une commande ni une livraison.') }}</p>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.menu-list > li:last-child {
  border-bottom: 0;
}
</style>
