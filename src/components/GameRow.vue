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

const isResultReady = computed(()=> result.value && isDefined(countFiil.isExist))

const resultIndicator = computed(() => {
  if (countFiil.isFetching.value) {
    return 'loading'
  }
  if (!isResultReady.value) {
    return null
  }
  if ((countFiil.data.value?.count ?? 0) > 0) {
    return 'exist'
  }
  return 'not-exist'
})

const fiil = useFiilQuery(result.value)

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
          <span
            v-if="resultIndicator"
            class="rounded-full h-5 text-center text-xs leading-5 w-5 inline-block children:align-middle"
            :class="[resultIndicator === 'exist' && 'bg-sky-600 ']"
          >
            <i-ph-spinner-gap-duotone v-if="resultIndicator === 'loading'" />
            <i-ic-baseline-check v-if="resultIndicator === 'exist'" />
          </span>
        </template>
      </GameCell>
      <GameCell v-else type="char" :is-row-active="isRowActive" :lit="col.cellLit">
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
</template>
