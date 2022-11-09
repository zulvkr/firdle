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
    const className = 'border-1 border-gray-500'
    cls.isRowActive = className
  } else {
    const className = 'border-1 border-gray-700'
    cls.isRowActive = className
  }

  if (props.lit) {
    const className = 'transform scale-105 ring ring-opacity-80 ring-sky-400'
    cls.litClass = className
  }
  return Object.values(cls).join(' ')
})
</script>

<template>
  <div
    class="rounded grid transition-all duration-75 relative"
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
