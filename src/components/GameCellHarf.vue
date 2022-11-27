<script setup lang="ts">
import { computedEager } from '@vueuse/shared'
import { storeToRefs } from 'pinia'

import { cellIndex, useGameGridStore } from '../store'

export interface GameCellHarf {
  cellIndex: cellIndex
  rowStatus: 'finished' | 'active' | 'inactive'
}

const props = defineProps<GameCellHarf>()

const gameGridStore = useGameGridStore()
const { gridU } = storeToRefs(gameGridStore)

const answerMatch = computedEager(() => {
  return gridU.value[props.cellIndex[0]][props.cellIndex[1]]?.cellMatch
})
const answerMatchClass = computedEager(() => {
  let className = ''
  if (answerMatch.value === 'matched') {
    className = '!bg-green-600'
  } else if (answerMatch.value === 'missed') {
    className = '!bg-dark-400'
  } else if (answerMatch.value === 'misplaced') {
    className = '!bg-yellow-600'
  }
  return className
})

const isLit = computedEager(() => {
  return gridU.value[props.cellIndex[0]][props.cellIndex[1]]?.cellLit
})

const litClass = computedEager(() =>
  isLit.value ? 'transform scale-105 ring ring-opacity-80 ring-sky-400 ring-2' : ''
)
</script>

<template>
  <Transition name="zoom-y" mode="out-in">
    <GameCell
      v-if="answerMatchClass"
      class="aspect-square"
      :class="[answerMatchClass, litClass]"
      :row-status="rowStatus"
    >
      <slot />
    </GameCell>
    <GameCell v-else class="aspect-square" :class="litClass" :row-status="rowStatus">
      <slot />
    </GameCell>
  </Transition>
</template>

<style lang="postcss" scoped>
.zoom-y-enter-active,
.zoom-y-leave-active {
  transition: transform 0.3s ease;
}

.zoom-y-enter-from,
.zoom-y-leave-to {
  transform: scaleY(0);
}
</style>
