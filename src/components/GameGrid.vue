<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useGameGridStore } from '../store/gameGrid'

const gameGridStore = useGameGridStore()
const { gridWithResult } = storeToRefs(gameGridStore)
</script>

<template>
  <div
    class="max-w-[380px] xl:max-w-[320px] mt-4 w-full grid px-5 gap-2 justify-self-center"
  >
    <template v-for="(row, rowIndex) in gridWithResult" :key="rowIndex">
      <GameRow :row="row" :index="rowIndex" />
    </template>
  </div>
</template>

<style>
.grid.answer {
  grid-template-columns: 70px repeat(4, minmax(0, 1fr));
}
</style>
