<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore, Cell } from '../store/game'
import { computed } from '@vue/reactivity'
import { useCountFiilQuery, useFiilQuery } from '../queries/fetcher'
import { useEventBus } from '../store/eventbus'
import { isDefined } from '@vueuse/shared'
import { ref } from 'vue'

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

const showInfoModal = ref(false)

async function onClickResult() {
  if (resultStatus.value === 'exist') {
    await fiil.execute()
    showInfoModal.value = true
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
              class="bg-gray-700 border"
            >
              <i-ic-baseline-question-mark transform="scale(-1,1)" />
            </Indicator>
          </Transition>
        </template>
      </GameCell>
      <GameCell v-else type="char" :is-row-active="isRowActive" :lit="col.cellLit">
        {{ col.cellText }}
      </GameCell>
    </template>
  </div>
  <Modal v-model="showInfoModal">
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
