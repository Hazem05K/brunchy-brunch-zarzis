<script setup lang="ts">
const menuOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="relative z-20 border-b border-[#E9C46A]/50 bg-cream">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-3 rounded-lg" aria-label="Brunchy Brunch Zarzis, accueil">
        <span class="grid size-11 place-items-center rounded-2xl bg-navy font-display text-lg text-white">BB</span>
        <span class="leading-tight">
          <span class="block font-display text-xl leading-none tracking-wide text-navy">Brunchy Brunch</span>
          <span class="mt-1 block text-[10px] font-bold tracking-[0.2em] text-slate-500">ZARZIS</span>
        </span>
      </NuxtLink>

      <button
        class="grid size-11 place-items-center rounded-xl border border-slate-200 text-navy md:hidden"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="text-xl" aria-hidden="true">{{ menuOpen ? '×' : '☰' }}</span>
      </button>

      <nav
        id="primary-navigation"
        :class="[
          'absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-slate-100 bg-cream p-5 shadow-card md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:p-0 md:shadow-none',
          menuOpen ? 'flex' : 'hidden md:flex',
        ]"
        aria-label="Navigation principale"
      >
        <NuxtLink class="nav-link" to="/">Accueil</NuxtLink>
        <NuxtLink class="nav-link" to="/branches">Branches</NuxtLink>
        <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
        <NuxtLink class="button-primary mt-2 md:mt-0" to="/branches">Choisir sa branche <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  border-radius: 0.5rem;
  padding: 0.65rem 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #31506f;
  transition: color 160ms ease;
}
.nav-link:hover,
.router-link-active.nav-link {
  color: #022252;
}
</style>
