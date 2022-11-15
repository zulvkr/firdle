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
  const cls = {
    answerMatchClass: '',
  }

  if (props.answerMatch === 'matched') {
    const className = '!bg-green-600'
    cls.answerMatchClass = className
  } else if (props.answerMatch === 'missed') {
    const className = '!bg-dark-400'
    cls.answerMatchClass = className
  } else if (props.answerMatch === 'misplaced') {
    const className = '!bg-yellow-600'
    cls.answerMatchClass = className
  }
  return Object.values(cls).join(' ')
})
</script>

<template>
  <GameCell :row-status="rowStatus" class="aspect-square" :class="dynamicClass">
    <slot />
  </GameCell>
</template>
