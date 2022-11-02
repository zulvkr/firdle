<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useGameStore, Cell } from '../store/game'

export interface Row {
  row: Cell[]
  index: number
}

const props = defineProps<Row>()
const rowIndex = ref(props.index)

const gameStore = useGameStore()
const { activeCellIndex } = storeToRefs(gameStore)

</script>

<template>
  <div class="grid gap-1 answer">
    <div
      v-for="col in props.row"
      class="rounded border-2 grid border-gray-600 transition-transform"
      :class="[
        col.cellType === 'result' ? 'bg-gray-700' : 'aspect-square',
        activeCellIndex[0] === rowIndex ? 'border-gray-600' : 'border-gray-700',
        col.cellLit &&
          'transform scale-105 border-light-500 ',
      ]"
    >
      <div class="place-self-center text-size-xl">
        {{ col.cellText }}
      </div>
    </div>
  </div>
</template>
