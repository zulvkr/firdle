<script setup lang="ts">
import { computedEager, isDefined } from '@vueuse/shared'
import { storeToRefs } from 'pinia'
import { computed, toRef, watchEffect } from 'vue'
import { onMounted } from 'vue'

import { useResultButton } from '../composables/useResultInfoModal'
import { useAnswerMatchQuery, useCountFiilQuery } from '../queries/fetcher'
import { useEventBus } from '../store/eventbus'
import { useGameStore } from '../store/game'
import { Cell, useGameGridStore } from '../store/gameGrid'
import { useSettingsStore } from '../store/settings'
import { gameMessages } from './gameMessages'

export interface Row {
  row: Cell[]
  index: number
}

const props = defineProps<Row>()

const gameGridStore = useGameGridStore()
const { activeCellIndex, results } = storeToRefs(gameGridStore)

const gameStore = useGameStore()
const { isPlaying, isFinished } = storeToRefs(gameStore)

const settingsStore = useSettingsStore()
const { persistentInfoModal } = storeToRefs(settingsStore)

const eventbus = useEventBus()

const rowIndex = computed(() => props.index)

const result = computed(() => props.row[0].cellText ?? '')

const rowStatus = computedEager(() => {
  if (activeCellIndex.value[0] > rowIndex.value) {
    return 'finished'
  }
  if (activeCellIndex.value[0] === rowIndex.value && isFinished.value) {
    return 'finished'
  }
  if (activeCellIndex.value[0] === rowIndex.value) {
    return 'active'
  }
  return 'inactive'
})

const isRowActive = computedEager(() => rowStatus.value === 'active')

const countFiil = useCountFiilQuery(result)

const isResultReady = computed(() => result.value && isDefined(countFiil.data))

const resultStatus = computedEager(() => {
  if (countFiil.isFetching.value) {
    return 'loading'
  }
  if (!isResultReady.value) {
    return null
  }
  if ((countFiil.data.value?.data?.count ?? 0) > 0) {
    return 'exist'
  }
  return 'not-exist'
})

const answerMatch = useAnswerMatchQuery(
  result,
  toRef(results.value[rowIndex.value], 'answerMatch')
)
const { cachedAnswer } = answerMatch

eventbus.$onAction(async ({ name }) => {
  if (!isRowActive.value || name !== 'kbEnter') {
    return
  }
  if (resultStatus.value === 'not-exist') {
    eventbus.snackbar({ status: 'info', message: gameMessages.snackbar.fiil_not_in_db })
  }
  if (resultStatus.value === 'exist' && !isFinished.value) {
    await answerMatch.execute()
    gameStore.evaluateStatus(cachedAnswer.value)
    if (isPlaying.value) {
      gameGridStore.forward()
    }
  }
})

watchEffect(async () => {
  if (cachedAnswer.value) {
    await gameGridStore.assignAnswerMatch(cachedAnswer.value, rowIndex.value)
  }
})

const { onClickResult, showInfoModal, fiil } = useResultButton(resultStatus, result)

onMounted(async () => {
  if (result.value) {
    await countFiil.execute()
    if (gameGridStore.isAnswerLocked(rowIndex.value)) {
      await answerMatch.execute()
    }
  }
  if (cachedAnswer.value) {
    await gameGridStore.assignAnswerMatch(cachedAnswer.value, rowIndex.value)
  }
})
</script>

<template>
  <div class="grid gap-1 answer">
    <template v-for="(col, colIndex) in props.row" :key="colIndex">
      <GameCellResult
        v-if="colIndex === 0"
        :row-status="rowStatus"
        :result-status="resultStatus"
        :class="[isResultReady && 'cursor-pointer']"
        @click="onClickResult"
      >
        {{ col.cellText }}
      </GameCellResult>
      <GameCellHarf
        v-else
        class="aspect-square"
        :row-status="rowStatus"
        :cell-index="[rowIndex, colIndex - 1]"
      >
        {{ col.cellText }}
      </GameCellHarf>
    </template>
  </div>
  <FModal v-model="showInfoModal" :persistent="persistentInfoModal">
    <InfoBox :data="fiil.data.value?.data" />
  </FModal>
</template>
