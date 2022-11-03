<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore, Cell } from '../store/game'
import { computed } from '@vue/reactivity'
import { useCountFiilQuery, useFiilQuery } from '../queries/fetcher'
import { useEventBus } from '../store/eventbus'

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

const countFiil = useCountFiilQuery(result)

const showResult = computed(() => Boolean(result.value) && countFiil.isExist.value)

const fiil = useFiilQuery(result.value)

useEventBus().$onAction(async ({ name, after }) => {
  if (!isRowActive) {
    return
  }
  if (name === 'kbEnter' && Boolean(result.value) && countFiil.isExist.value) {
    await fiil.execute()
    console.log(fiil.data.value)
    gameStore.forward()
  }
})
</script>

<template>
  <div class="grid gap-1 answer">
    <template v-for="(col, index) in props.row">
      <GameCell v-if="index === 0" type="result" :is-row-active="isRowActive">
        {{ col.cellText }}
        <template #indicator>
          <i-ph-spinner-gap-duotone v-if="countFiil.isFetching.value" />
          <i-ic-baseline-check v-if="showResult" />
        </template>
      </GameCell>
      <GameCell v-else type="char" :is-row-active="isRowActive" :lit="col.cellLit">
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
</template>
