<script setup lang="ts">
import { computed } from 'vue'

export interface GameCell {
  type: 'result' | 'char'
  lit?: boolean
  isRowActive: boolean
}

const props = defineProps<GameCell>()

const dynamicClass = computed(() => {
  const cls = {
    typeClass: '',
    litClass: '',
    isRowActive: '',
  }
  if (props.type === 'result') {
    const className = 'bg-gray-700'
    cls.typeClass = className
  }
  if (props.type === 'char') {
    const className = 'aspect-square'
    cls.typeClass = className
  }

  if (props.isRowActive) {
    const className = 'border-gray-500'
    cls.isRowActive = className
  } else {
    const className = 'border-gray-700'
    cls.isRowActive = className
  }

  if (props.lit) {
    const className = 'transform scale-105 !border-light-600'
    cls.litClass = className
  }
  return Object.values(cls).join(' ')
})
</script>

<template>
  <div
    class="rounded border-2 grid border-gray-600 transition-transform relative"
    :class="dynamicClass"
  >
    <div class="absolute -top-3 -left-3">
      <slot name="indicator"> </slot>
    </div>
    <div class="place-self-center text-size-xl">
      <slot />
    </div>
  </div>
</template>
