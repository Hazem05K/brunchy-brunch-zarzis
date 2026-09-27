<script setup lang="ts">
const { locale, direction } = useLocale()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
    dir: () => direction.value,
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
