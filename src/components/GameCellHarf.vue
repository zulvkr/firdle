<script setup lang="ts">
import { computedEager } from '@vueuse/shared'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { cellIndex, useGameGridStore } from '../store/gameGrid'

export interface GameCellHarf {
  lit?: boolean
  cellIndex: cellIndex
}

const props = defineProps<GameCellHarf>()

const gameGridStore = useGameGridStore()
const { gridU } = storeToRefs(gameGridStore)

const answerMatch = computedEager(() => {
  return gridU.value[props.cellIndex[0]][props.cellIndex[1]]?.cellMatch
})

const dynamicClass = computed(() => {
  let answerMatchClass

  if (answerMatch.value === 'matched') {
    const className = '!bg-green-600'
    answerMatchClass = className
  } else if (answerMatch.value === 'missed') {
    const className = '!bg-dark-400'
    answerMatchClass = className
  } else if (answerMatch.value === 'misplaced') {
    const className = '!bg-yellow-600'
    answerMatchClass = className
  }

  // if (props.lit) {
  //   const className = 'transform scale-105 ring ring-opacity-80 ring-sky-400 ring-2'
  //   cls.litClass = className
  // }

  return answerMatchClass
})
</script>

<template>
  <GameCell class="aspect-square" :class="dynamicClass">
    <slot />
  </GameCell>
</template>
