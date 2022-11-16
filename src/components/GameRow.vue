<script setup lang="ts">
import { isDefined } from '@vueuse/shared'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'

import {
  useAnswerMatchQuery,
  useCountFiilQuery,
  useFiilQuery,
} from '../queries/fetcher'
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
const { activeCellIndex } = storeToRefs(gameGridStore)

const gameStore = useGameStore()
const { isPlaying, isFinished } = storeToRefs(gameStore)

const settingsStore = useSettingsStore()
const { persistentInfoModal } = storeToRefs(settingsStore)

const eventbus = useEventBus()

const rowIndex = computed(() => props.index)

const result = computed(() => props.row[0].cellText ?? '')

const rowStatus = computed(() => {
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

const isRowActive = computed(() => rowStatus.value === 'active')

const countFiil = useCountFiilQuery(result)

const isResultReady = computed(() => result.value && isDefined(countFiil.data))

const resultStatus = computed(() => {
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

const fiil = useFiilQuery(result)

const answerMatch = useAnswerMatchQuery(result)

const unsubscribe = eventbus.$onAction(async ({ name }) => {
  if (!isRowActive.value || name !== 'kbEnter') {
    return
  }
  if (resultStatus.value === 'not-exist') {
    eventbus.snackbar({ status: 'info', message: gameMessages.snackbar.fiil_not_in_db })
  }
  if (resultStatus.value === 'exist' && !isFinished.value) {
    await answerMatch.execute()
    const answer = answerMatch.data.value?.data?.answer
    if (answer) {
      await gameGridStore.assignAnswerMatch(answer)
    }
    gameStore.evaluateStatus()
    if (isPlaying.value) {
      gameGridStore.forward()
      unsubscribe()
    }
  }
})

const showInfoModal = ref(false)

async function onClickResult() {
  if (resultStatus.value === 'exist') {
    await fiil.execute()
    showInfoModal.value = true
  }
  if (resultStatus.value === 'not-exist') {
    eventbus.snackbar({ status: 'info', message: gameMessages.snackbar.fiil_not_in_db })
  }
}

onMounted(() => {
  if (result.value) {
    countFiil.execute()
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
        :answer-match="col.cellAnswerMatch"
        :class="[isResultReady && 'cursor-pointer']"
        @click="onClickResult"
      >
        {{ col.cellText }}
      </GameCellResult>
      <GameCellHarf
        v-else
        class="aspect-square"
        :row-status="rowStatus"
        :lit="col.cellLit"
        :answer-match="col.cellAnswerMatch"
      >
        {{ col.cellText }}
      </GameCellHarf>
    </template>
  </div>
  <FModal v-model="showInfoModal" :persistent="persistentInfoModal">
    <InfoBox :data="fiil.data.value?.data" />
  </FModal>
</template>
