<script setup lang="ts">
import { computed } from 'vue'

export interface GameCell {
  lit?: boolean
  rowStatus: 'finished' | 'active' | 'inactive'
}

const props = defineProps<GameCell>()

const dynamicClass = computed(() => {
  const cls = {
    litClass: '',
    activeRowClass: '',
  }

  if (props.rowStatus === 'active') {
    const className = 'border-1 border-gray-500'
    cls.activeRowClass = className
  } else {
    const className = 'border-1 border-gray-700'
    cls.activeRowClass = className
  }

  if (props.lit) {
    const className = 'transform scale-105 ring ring-opacity-80 ring-sky-400 ring-2'
    cls.litClass = className
  }

  return Object.values(cls).join(' ')
})
</script>

<template>
  <div
    class="rounded grid transition-all duration-75 relative content-center group"
    :class="dynamicClass"
  >
    <slot name="indicator" />
    <div class="place-self-center text-size-xl">
      <slot />
    </div>
  </div>
</template>
