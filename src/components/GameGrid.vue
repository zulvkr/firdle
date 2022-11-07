<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { useGameStore } from '../store/game'

const gameStore = useGameStore()
const { gridWithResult } = storeToRefs(gameStore)

</script>

<template>
  <div
    class="max-w-[380px] xl:max-w-[320px] mt-4 w-full grid px-5 gap-2 justify-self-center"
  >
    <template v-for="(row, rowIndex) in gridWithResult">
      <GameRow :row="row" :index="rowIndex" />
    </template>
  </div>
</template>

<style>
.grid.answer {
  grid-template-columns: 70px repeat(4, minmax(0, 1fr));
}
</style>
