<script setup lang="ts">
import { canonicalUrl } from '~/utils/seo'
const config = useRuntimeConfig()
const canonical = canonicalUrl('/privacy', config.public.siteUrl)
useSeoMeta({
  title: 'Confidentialité | Brunchy Brunch Zarzis',
  description: 'Informations sur l’utilisation des données transmises à Brunchy Brunch Zarzis lors d’une demande de commande ou de livraison.',
  ogTitle: 'Confidentialité | Brunchy Brunch Zarzis',
  ogDescription: 'Comment les données de votre demande sont utilisées.',
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({ link: canonical ? [{ rel: 'canonical', href: canonical }] : [] })
</script>

<template>
  <article class="mx-auto max-w-3xl px-5 py-16 lg:py-24">
    <p class="eyebrow">Vos données</p>
    <h1 class="section-title mt-4">Confidentialité</h1>
    <div class="prose-content mt-8 space-y-6 text-slate-600">
      <section>
        <h2>Utilisation des informations</h2>
        <p>Les informations saisies dans une demande de livraison (nom, téléphone, adresse, date, heure, nombre de box, description et adresse e-mail facultative) ou dans le formulaire de contact (nom, téléphone, message et adresse e-mail facultative) sont utilisées par Brunchy Brunch uniquement pour traiter le message et répondre à la personne concernée.</p>
      </section>
      <section>
        <h2>Transmission et conservation</h2>
        <p>Le message est transmis par e-mail à Brunchy Brunch. Il n’est pas utilisé pour créer un compte ni pour envoyer des communications marketing. Les messages sont conservés uniquement le temps nécessaire à leur traitement et aux obligations applicables. L’hébergeur et le fournisseur SMTP peuvent traiter des données techniques nécessaires au service.</p>
      </section>
      <section>
        <h2>reCAPTCHA</h2>
        <p>Le formulaire utilise Google reCAPTCHA pour limiter les envois automatisés. Son utilisation est soumise aux conditions et à la politique de confidentialité de Google.</p>
      </section>
      <section>
        <h2>Vos demandes</h2>
        <p>Pour toute question ou demande relative aux informations transmises, contactez la branche concernée en passant par la <NuxtLink to="/contact">page contact</NuxtLink>.</p>
      </section>
      <p class="text-sm text-slate-500">Cette notice devra être complétée avec les coordonnées juridiques et les durées de conservation validées par Brunchy Brunch avant la mise en production.</p>
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
