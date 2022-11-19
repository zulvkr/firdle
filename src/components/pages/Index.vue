<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useGameStore } from '../../store/game'
import { gameMessages } from '../../composables/gameMessages'

const gameStore = useGameStore()
const { isFinished, timeToExp } = storeToRefs(gameStore)

const { kb_sheet, meta } = gameMessages

const message = computed(() => {
  return kb_sheet.new_game_in_time(timeToExp.value)
})

useHead({
  title: 'Firdle',
  meta: [
    {
      name: 'description',
      content: meta.description,
    },
  ],
})
</script>

<template>
  <div class="grid index-page items-center overflow-y-auto">
    <GameGrid />
  </div>
  <KB v-if="!isFinished" />
  <div v-else class="grid place-content-center h-[var(--keyboard-height)] font-IBM">
    {{ message }}
  </div>
</template>

<style lang="postcss" scoped>
.grid.index-page {
  height: calc(var(--main-height) - var(--keyboard-height));
}
</style>

<style>
:root {
  --keyboard-height: 216px;
}
</style>
