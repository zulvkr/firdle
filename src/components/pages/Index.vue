<script setup lang="ts">
import ArabicKB from '../ArabicKB.vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '../../store/game'

const gameStore = useGameStore()
const { gridWithResult, activeCellIndex } = storeToRefs(gameStore)
</script>

<template>
  <div class="grid index-page items-center">
    <div
      class="max-w-[380px] md:max-w-[380px] mt-4 w-full grid px-5 gap-2 justify-self-center"
    >
      <div v-for="(row, index) in gridWithResult" class="grid gap-1 answer">
        <div
          v-for="col in row"
          class="rounded border-2 grid border-gray-600"
          :class="[
            col.type !== 'fiil' && 'aspect-square',
            activeCellIndex[0] === index ? 'border-gray-600' : 'border-gray-700',
          ]"
        >
          <div class="place-self-center text-size-xl">
            {{ col.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ArabicKB />
</template>

<style lang="postcss" scoped>
.grid.index-page {
  /* Padding necessary to prevent some parts of grid hidden by keyboard */
  --keyboard-height: 230px;
  /* padding-bottom: 230px; */
  height: calc(100vh - var(--keyboard-height)); /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - var(--keyboard-height));
}
.grid.answer {
  grid-template-columns: 70px repeat(4, minmax(0, 1fr));
}
</style>
