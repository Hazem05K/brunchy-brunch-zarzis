<script setup lang="ts">
const { t, localizePath } = useLocale()
</script>

<template>
  <footer class="bg-navy text-white">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div>
        <NuxtLink :to="localizePath('/')" class="text-xl font-extrabold tracking-tight">Brunchy Brunch</NuxtLink>
        <p class="mt-3 max-w-sm text-sm leading-6 text-blue-100">{{ t('Brunch, repas et demandes de livraison à Zarzis. Votre branche vous recontacte pour confirmer chaque demande.') }}</p>
      </div>
      <div>
        <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-sky">{{ t('Découvrir') }}</h2>
        <ul class="mt-4 space-y-3 text-sm text-blue-100">
          <li><NuxtLink :to="localizePath('/branches')" class="hover:text-white">{{ t('Nos branches') }}</NuxtLink></li>
          <li><NuxtLink :to="localizePath('/branches')" class="hover:text-white">{{ t('Choisir sa branche') }}</NuxtLink></li>
          <li><NuxtLink :to="localizePath('/contact')" class="hover:text-white">{{ t('Contact') }}</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-sky">{{ t('Informations') }}</h2>
        <ul class="mt-4 space-y-3 text-sm text-blue-100">
          <li><NuxtLink :to="localizePath('/privacy')" class="hover:text-white">{{ t('Confidentialité') }}</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/15">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {{ new Date().getFullYear() }} Brunchy Brunch Zarzis</span>
        <span>{{ t('Site officiel — Zarzis, Médenine, Tunisie') }}</span>
      </div>
    </div>
  </footer>
</template>
