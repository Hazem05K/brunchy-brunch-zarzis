<script setup lang="ts">
import type { Branch } from '~/data/branches'
import { appPath } from '~/utils/app-path'

defineProps<{ branch: Branch }>()
const appBaseURL = useRuntimeConfig().app.baseURL
const { t, localizePath } = useLocale()
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-sky">
    <NuxtLink :to="localizePath(`/branches/${branch.slug}`)" class="relative block aspect-[1.45] overflow-hidden bg-mist" :aria-label="t('Découvrir {name}', { name: branch.name })">
      <img
        class="size-full object-cover transition duration-500 group-hover:scale-105"
        :src="appPath(branch.image || '/images/brunch-illustrative.jpg', appBaseURL)"
        :alt="t('Photo culinaire illustrative pour {name}, ne représentant pas son menu réel', { name: branch.name })"
        width="900"
        height="600"
        loading="lazy"
        decoding="async"
      >
      <span class="absolute left-4 top-4 rounded-full border border-white/40 bg-navy/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur">
        {{ t('Illustration') }}
      </span>
      <span class="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-navy shadow-card transition group-hover:bg-sky" aria-hidden="true">↗</span>
    </NuxtLink>
    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <div class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
        <span class="size-2 rounded-full bg-orange" aria-hidden="true" /> {{ t('Zarzis') }}
        <span class="ms-auto font-normal normal-case tracking-normal">{{ t('Photo illustrative') }}</span>
      </div>
      <h3 class="text-xl leading-snug text-navy">{{ branch.name }}</h3>
      <p class="mt-2 text-sm leading-6 text-slate-500">{{ t(branch.description || '') }}</p>
      <div class="mt-auto flex flex-wrap gap-3 pt-6">
        <NuxtLink class="button-primary flex-1" :to="localizePath(`/branches/${branch.slug}#demande`)">{{ t('Commander ici') }}</NuxtLink>
      </div>
    </div>
  </article>
</template>
