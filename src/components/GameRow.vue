<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore, Cell } from '../store/game'
import { computed } from '@vue/reactivity'
import { useCountFiilQuery, useFiilQuery } from '../queries/fetcher'
import { useEventBus } from '../store/eventbus'
import { isDefined } from '@vueuse/shared'

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

const isResultReady = computed(()=> result.value && isDefined(countFiil.data))

const resultIndicator = computed(() => {
  if (countFiil.isFetching.value) {
    return 'loading'
  }
  if (!isResultReady.value) {
    return null
  }
  if ((countFiil.data.value?.data.count ?? 0) > 0) {
    return 'exist'
  }
  return 'not-exist'
})

const fiil = useFiilQuery(result)

const unsubscribe = useEventBus().$onAction(async ({ name }) => {
  if (!isRowActive.value) {
    return
  }
  if (name === 'kbEnter' && isResultReady.value) {
    await fiil.execute()
    gameStore.forward()
    unsubscribe()
  }
})
</script>

<template>
  <div class="grid gap-1 answer">
    <template v-for="(col, index) in props.row">
      <GameCell v-if="index === 0" type="result" :is-row-active="isRowActive">
        {{ col.cellText }}
        <template #indicator>
          <div
            v-if="resultIndicator"
            class="rounded-full h-5 w-5 text-sm text-center leading-5 grid place-items-center"
            :class="[
              resultIndicator === 'exist' && 'bg-sky-600',
              resultIndicator === 'not-exist' && 'bg-gray-700 border'
            ]"
          >
            <i-ph-spinner-gap-duotone v-if="resultIndicator === 'loading'" />
            <i-ic-baseline-check v-else-if="resultIndicator === 'exist'" />
            <i-ic-baseline-question-mark v-else-if="resultIndicator === 'not-exist'" transform="scale(-1,1)"/>
          </div>
        </template>
      </GameCell>
      <GameCell v-else type="char" :is-row-active="isRowActive" :lit="col.cellLit">
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
</template>
