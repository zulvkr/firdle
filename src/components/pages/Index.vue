<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { gameMessages } from '../../composables/gameMessages'
import { useGameTime } from '../../composables/useGameTime'
import { useResetGame } from '../../composables/useResetGame'
import { useGameStore } from '../../store/game'

const gameStore = useGameStore()
const { isFinished } = storeToRefs(gameStore)

const { timeToExp, expireNow } = useGameTime()
const { reset } = useResetGame()

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
    <FButton @click="expireNow">expire</FButton>
    <FButton @click="reset">reset</FButton>
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
