<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { answerMatch } from '../queries/type'
import { useGameStore } from '../store/game'

export interface GameCell {
  type: 'result' | 'harf'
  lit?: boolean
  isRowActive: boolean
  answerMatch?: answerMatch
}

const gameStore = useGameStore()
const { isFinished } = storeToRefs(gameStore)

const props = defineProps<GameCell>()

const dynamicClass = computed(() => {
  const cls = {
    typeClass: '',
    litClass: '',
    answerMatchClass: '',
    isRowActive: '',
  }
  if (props.type === 'result') {
    const className = 'bg-gray-700'
    cls.typeClass = className
  }
  if (props.type === 'harf') {
    const className = 'aspect-square'
    cls.typeClass = className
  }

  if (!isFinished.value && props.isRowActive) {
    const className = 'border-1 border-gray-500'
    cls.isRowActive = className
  } else {
    const className = 'border-1 border-gray-700'
    cls.isRowActive = className
  }

  if (props.lit) {
    const className = 'transform scale-105 ring ring-opacity-80 ring-sky-400 ring-2'
    cls.litClass = className
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
  <div
    class="rounded grid transition-all duration-75 relative content-center"
    :class="dynamicClass"
  >
    <div class="absolute -top-2 -left-3">
      <slot name="indicator"> </slot>
    </div>
    <div class="place-self-center text-size-xl">
      <slot />
    </div>
  </div>
</template>
