<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const emit = defineEmits(['clickOutside'])

const target = ref(null)

onClickOutside(target, () => {
  emit('clickOutside')
})
</script>

<template>
  <div
    ref="target"
    class="backdrop-filter backdrop-blur py-1 px-4 sm:py-2 h-[var(--app-bar-height)]"
  >
    <slot />
  </div>
</template>

<style lang="postcss"></style>
