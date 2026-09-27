<script setup lang="ts">
import { localizedSeoLinks } from '~/utils/seo'
definePageMeta({ alias: ['/ar/privacy'] })
const config = useRuntimeConfig()
const { t, locale, localizePath } = useLocale()
const localizedLinks = computed(() => localizedSeoLinks('/privacy', locale.value, config.public.siteUrl))
useSeoMeta({
  title: () => t('Confidentialité | Brunchy Brunch Zarzis'),
  description: () => t('Informations sur l’utilisation des données transmises à Brunchy Brunch Zarzis lors d’une demande de commande ou de livraison.'),
  ogTitle: () => t('Confidentialité | Brunchy Brunch Zarzis'),
  ogDescription: () => t('Comment les données de votre demande sont utilisées.'),
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: localizedLinks })
</script>

<template>
  <article class="mx-auto max-w-3xl px-5 py-16 lg:py-24">
    <p class="eyebrow">{{ t('Vos données') }}</p>
    <h1 class="section-title mt-4">{{ t('Confidentialité') }}</h1>
    <div class="prose-content mt-8 space-y-6 text-slate-600">
      <section>
        <h2>{{ t('Utilisation des informations') }}</h2>
        <p>{{ t('Les informations saisies dans une demande de livraison (nom, téléphone, adresse, date, heure, nombre de box, description et adresse e-mail facultative) ou dans le formulaire de contact (nom, téléphone, message et adresse e-mail facultative) sont utilisées par Brunchy Brunch uniquement pour traiter le message et répondre à la personne concernée.') }}</p>
      </section>
      <section>
        <h2>{{ t('Transmission et conservation') }}</h2>
        <p>{{ t('Le message est transmis par e-mail à Brunchy Brunch. Il n’est pas utilisé pour créer un compte ni pour envoyer des communications marketing. Les messages sont conservés uniquement le temps nécessaire à leur traitement et aux obligations applicables. L’hébergeur et le fournisseur SMTP peuvent traiter des données techniques nécessaires au service.') }}</p>
      </section>
      <section>
        <h2>reCAPTCHA</h2>
        <p>{{ t('Le formulaire utilise Google reCAPTCHA pour limiter les envois automatisés. Son utilisation est soumise aux conditions et à la politique de confidentialité de Google.') }}</p>
      </section>
      <section>
        <h2>{{ t('Vos demandes') }}</h2>
        <p>{{ t('Pour toute question ou demande relative aux informations transmises, contactez la branche concernée en passant par la') }} <NuxtLink :to="localizePath('/contact')">{{ t('page contact') }}</NuxtLink>.</p>
      </section>
      <p class="text-sm text-slate-500">{{ t('Cette notice devra être complétée avec les coordonnées juridiques et les durées de conservation validées par Brunchy Brunch avant la mise en production.') }}</p>
    </div>
  </article>
</template>

<style scoped>
.prose-content h2 {
  margin-bottom: 0.75rem;
  color: #022252;
  font-size: 1.15rem;
  font-weight: 800;
}
.prose-content p {
  line-height: 1.8;
}
.prose-content a {
  color: #022252;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
