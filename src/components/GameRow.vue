<script setup lang="ts">
import { computedEager, isDefined } from '@vueuse/shared'
import { storeToRefs } from 'pinia'
import { computed, toRef } from 'vue'
import { onMounted } from 'vue'

import { gameMessages, useResultInfoModal, useRow } from '../composables'
import { useAnswerMatchQuery, useCountFiilQuery } from '../queries'
import {
  Cell,
  kbEnterBus,
  snackbarBus,
  useGameGridStore,
  useGameStore,
  useSettingsStore,
} from '../store'

export interface Row {
  row: Cell[]
  index: number
}

const props = defineProps<Row>()

const gameGridStore = useGameGridStore()
const { results } = storeToRefs(gameGridStore)

const gameStore = useGameStore()
const { isPlaying, isFinished } = storeToRefs(gameStore)

const settingsStore = useSettingsStore()
const { persistentInfoModal } = storeToRefs(settingsStore)

const resultText = computed(() => props.row[0].cellText ?? '')

const { isRowActive, rowStatus, rowIndex } = useRow(props.index)

const countFiil = useCountFiilQuery(resultText)

const isResultReady = computed(() => resultText.value && isDefined(countFiil.data))

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
  resultText,
  toRef(results.value[rowIndex], 'answerMatch')
)

const { cachedAnswer } = answerMatch

async function evaluateRow() {
  await answerMatch.execute()
  if (!cachedAnswer.value) {
    return
  }
  await gameGridStore.assignAnswerMatch(cachedAnswer.value, rowIndex)
  if (!isRowActive.value) {
    return
  }
  gameStore.evaluateStatus(cachedAnswer.value)
  if (!isPlaying.value) {
    return
  }
  gameGridStore.forward()
}

kbEnterBus.on(async () => {
  if (!isRowActive.value) {
    return
  }
  window?.umami?.(`round_${String(props.index + 1)}`)
  if (resultStatus.value === 'not-exist') {
    snackbarBus.emit({ status: 'info', message: gameMessages.snackbar.fiil_not_in_db })
  }
  if (resultStatus.value === 'exist' && !isFinished.value) {
    results.value[rowIndex].locked = true
    await evaluateRow()
  }
})

const { onClickResult, showInfoModal, fiil } = useResultInfoModal(
  resultStatus,
  resultText
)

onMounted(async () => {
  if (!resultText.value) {
    return
  }
  await countFiil.execute()
  if (!gameGridStore.isAnswerLocked(rowIndex)) {
    return
  }
  await evaluateRow()
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
