<script setup lang="ts">
import { computed } from 'vue'

import { answerMatch } from '../queries/type'

export interface GameCellHarf {
  lit?: boolean
  rowStatus: 'finished' | 'active' | 'inactive'
  answerMatch?: answerMatch
}

const props = defineProps<GameCellHarf>()

const dynamicClass = computed(() => {
  let answerMatchClass

  if (props.answerMatch === 'matched') {
    const className = '!bg-green-600'
    answerMatchClass = className
  } else if (props.answerMatch === 'missed') {
    const className = '!bg-dark-400'
    answerMatchClass = className
  } else if (props.answerMatch === 'misplaced') {
    const className = '!bg-yellow-600'
    answerMatchClass = className
  }
  return answerMatchClass
})
</script>

<template>
  <GameCell :row-status="rowStatus" class="aspect-square" :class="dynamicClass">
    <slot />
  </GameCell>
</template>
