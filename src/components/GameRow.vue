<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { isDefined } from '@vueuse/shared'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

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
const { isPlaying } = storeToRefs(gameStore)

const settingsStore = useSettingsStore()
const { persistentInfoModal } = storeToRefs(settingsStore)

const eventbus = useEventBus()

const rowIndex = computed(() => props.index)

const result = computed(() => props.row[0].cellText ?? '')

const isRowActive = computed(() => activeCellIndex.value[0] === rowIndex.value)

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
  if (!isRowActive.value) {
    return
  }
  if (name !== 'kbEnter') {
    return
  }
  if (resultStatus.value === 'exist') {
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
  if (resultStatus.value === 'not-exist') {
    eventbus.snackbar({ status: 'info', message: gameMessages.snackbar.fiil_not_in_db })
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
</script>

<template>
  <div class="grid gap-1 answer">
    <template v-for="(col, index) in props.row">
      <GameCell
        v-if="index === 0"
        type="result"
        :is-row-active="isRowActive"
        @click="onClickResult"
        :class="[isResultReady && 'cursor-pointer']"
      >
        {{ col.cellText }}
        <template #indicator>
          <Indicator v-if="resultStatus === 'loading'">
            <i-ph-spinner-gap-duotone class="animate-spin" />
          </Indicator>
          <Transition name="zoom" mode="out-in">
            <Indicator v-if="resultStatus === 'exist'" class="bg-sky-600">
              <i-ic-baseline-check />
            </Indicator>
            <Indicator
              v-else-if="resultStatus === 'not-exist'"
              class="bg-gray-700 border border-gray-500"
            >
              <i-ic-baseline-question-mark transform="scale(-1,1)" />
            </Indicator>
          </Transition>
        </template>
      </GameCell>
      <GameCell
        v-else
        type="harf"
        :is-row-active="isRowActive"
        :lit="col.cellLit"
        :answer-match="col.cellAnswerMatch"
      >
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
  <Modal v-model="showInfoModal" :persistent="persistentInfoModal">
    <InfoBox :data="fiil.data.value?.data" />
  </Modal>
</template>

<style scoped lang="postcss">
.zoom-enter-active,
.zoom-leave-active {
  transition: transform 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale3d(0, 0, 0);
}
</style>
