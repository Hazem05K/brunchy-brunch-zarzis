<script setup lang="ts">
const props = defineProps<{
  branchName: string
  photos: string[]
}>()

const track = ref<HTMLElement>()
const activeIndex = ref(0)
let updateFrame = 0

function updateActivePhoto() {
  if (!track.value) return

  cancelAnimationFrame(updateFrame)
  updateFrame = requestAnimationFrame(() => {
    if (!track.value) return
    const slides = [...track.value.children]
    const trackLeft = track.value.getBoundingClientRect().left
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })
    activeIndex.value = closestIndex
  })
}

function showPhoto(index: number) {
  const photo = track.value?.children[index] as HTMLElement | undefined
  photo?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function movePhoto(direction: -1 | 1) {
  const nextIndex = (activeIndex.value + direction + props.photos.length) % props.photos.length
  showPhoto(nextIndex)
}

onBeforeUnmount(() => cancelAnimationFrame(updateFrame))
</script>

<template>
  <section v-if="photos.length" class="bg-white py-14 sm:py-18" :aria-label="`Galerie photo de la branche ${branchName}`">
    <div class="mx-auto max-w-7xl px-5 lg:px-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Un peu de gourmandise</p>
          <h2 class="section-title mt-2 text-3xl sm:text-4xl">{{ branchName }} en images</h2>
          <p class="mt-2 text-sm text-slate-500">Photos d’ambiance uniquement illustratives.</p>
        </div>
        <div class="flex shrink-0 gap-2">
          <button
            class="gallery-arrow"
            type="button"
            :aria-label="`Photo précédente de ${branchName}`"
            @click="movePhoto(-1)"
          >←</button>
          <button
            class="gallery-arrow"
            type="button"
            :aria-label="`Photo suivante de ${branchName}`"
            @click="movePhoto(1)"
          >→</button>
        </div>
      </div>

      <div
        ref="track"
        class="gallery-track -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:px-0"
        :aria-label="`Galerie de ${photos.length} photos illustratives`"
        @scroll.passive="updateActivePhoto"
      >
        <figure
          v-for="(photo, index) in photos"
          :key="photo"
          class="relative aspect-[1.12] w-[86%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-mist shadow-card sm:aspect-[1.55] sm:w-[72%] lg:w-[68%]"
          :aria-label="`Photo ${index + 1} sur ${photos.length}`"
        >
          <img
            class="size-full object-cover"
            :src="photo"
            :alt="`Photo culinaire illustrative ${index + 1} pour ${branchName}, sans lien avec son menu réel`"
            width="1100"
            height="730"
            loading="lazy"
            decoding="async"
          >
          <figcaption class="absolute bottom-3 right-3 rounded-lg border border-white/25 bg-navy/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
            Illustration · {{ index + 1 }} / {{ photos.length }}
          </figcaption>
        </figure>
      </div>

      <div class="mt-5 flex justify-center gap-2" role="group" :aria-label="`Choisir une photo de ${branchName}`">
        <button
          v-for="(photo, index) in photos"
          :key="photo"
          class="gallery-dot"
          :class="{ 'gallery-dot-active': index === activeIndex }"
          type="button"
          :aria-label="`Afficher la photo ${index + 1}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="showPhoto(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-track {
  scrollbar-width: none;
  scroll-behavior: smooth;
  touch-action: pan-x pan-y;
}
.gallery-track::-webkit-scrollbar {
  display: none;
}
.gallery-arrow {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid #dce8f1;
  border-radius: 9999px;
  background: white;
  color: #022252;
  font-size: 1.2rem;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}
.gallery-arrow:hover {
  border-color: #f4a261;
  background: #f4a261;
  color: #022252;
}
.gallery-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #e9c46a;
  transition: width 160ms ease, background 160ms ease;
}
.gallery-dot-active {
  width: 1.5rem;
  background: #022252;
}
</style>
