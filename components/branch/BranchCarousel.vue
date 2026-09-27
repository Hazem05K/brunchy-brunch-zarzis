<script setup lang="ts">
import type { Branch } from '~/data/branches'

defineProps<{ branches: Branch[] }>()

const track = ref<HTMLElement>()

function move(direction: -1 | 1) {
  const firstCard = track.value?.querySelector<HTMLElement>('[data-branch-card]')
  if (!track.value || !firstCard) return

  const styles = getComputedStyle(track.value)
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
  track.value.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'smooth' })
}
</script>

<template>
  <div>
    <div class="mb-6 flex justify-end gap-2">
      <button class="carousel-arrow" type="button" aria-label="Branches précédentes" @click="move(-1)">←</button>
      <button class="carousel-arrow" type="button" aria-label="Branches suivantes" @click="move(1)">→</button>
    </div>
    <div
      ref="track"
      class="branch-track -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
      aria-label="Galerie des points de vente"
    >
      <div
        v-for="branch in branches"
        :key="branch.id"
        data-branch-card
        class="w-[min(82vw,21rem)] shrink-0 snap-start sm:w-[min(48vw,22rem)] lg:w-[calc((100%-2.5rem)/3)]"
      >
        <BranchCard :branch="branch" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.branch-track {
  scrollbar-width: none;
}
.branch-track::-webkit-scrollbar {
  display: none;
}
.carousel-arrow {
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
.carousel-arrow:hover {
  border-color: #022252;
  background: #022252;
  color: white;
}
</style>
