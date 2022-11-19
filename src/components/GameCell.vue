<script setup lang="ts">
import { computed } from 'vue'

export interface GameCell {
  rowStatus: 'finished' | 'active' | 'inactive'
}

const props = defineProps<GameCell>()

const dynamicClass = computed(() => {
  let cls = ''
  if (props.rowStatus === 'active') {
    const className = 'border-1 border-gray-500'
    cls = className
  } else {
    const className = 'border-1 border-gray-700'
    cls = className
  }

  return cls
})
</script>

<template>
  <div
    class="rounded grid transition-all duration-75 relative content-center group select-none"
    :class="dynamicClass"
  >
    <slot name="indicator" />
    <div class="place-self-center text-size-xl">
      <slot />
    </div>
  </div>
</template>
