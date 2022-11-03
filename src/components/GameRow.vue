<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore, Cell } from '../store/game'
import { computed } from '@vue/reactivity'


export interface Row {
  row: Cell[]
  index: number
}

const props = defineProps<Row>()
const rowIndex = computed(() => props.index)

const gameStore = useGameStore()
const { activeCellIndex } = storeToRefs(gameStore)

const result = computed(() => props.row[0].cellText ?? '')

const isRowActive = computed(() => activeCellIndex.value[0] === rowIndex.value)

</script>

<template>
  <div class="grid gap-1 answer">
    <template v-for="(col, index) in props.row">
      <GameCell v-if="index === 0" type="result" :is-row-active="isRowActive">
        {{ col.cellText }}
      </GameCell>
      <GameCell v-else type="char" :is-row-active="isRowActive" :lit="col.cellLit">
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
</template>
