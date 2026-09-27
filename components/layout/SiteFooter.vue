<template>
  <footer class="bg-navy text-white">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div>
        <NuxtLink to="/" class="text-xl font-extrabold tracking-tight">Brunchy Brunch</NuxtLink>
        <p class="mt-3 max-w-sm text-sm leading-6 text-blue-100">Brunch, repas et demandes de livraison à Zarzis. Votre branche vous recontacte pour confirmer chaque demande.</p>
      </div>
      <div>
        <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-sky">Découvrir</h2>
        <ul class="mt-4 space-y-3 text-sm text-blue-100">
          <li><NuxtLink to="/branches" class="hover:text-white">Nos branches</NuxtLink></li>
          <li><NuxtLink to="/branches" class="hover:text-white">Choisir sa branche</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-bold uppercase tracking-[0.16em] text-sky">Informations</h2>
        <ul class="mt-4 space-y-3 text-sm text-blue-100">
          <li><NuxtLink to="/privacy" class="hover:text-white">Confidentialité</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/15">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {{ new Date().getFullYear() }} Brunchy Brunch Zarzis</span>
        <span>Site officiel — Zarzis, Médenine, Tunisie</span>
      </div>
    </div>
  </footer>
</template>
