<template>
  <div class="flex min-h-screen flex-col">
    <a href="#contenu" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-navy">
      Aller au contenu
    </a>
    <LayoutSiteHeader />
    <main id="contenu" class="flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>
