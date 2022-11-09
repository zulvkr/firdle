<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Firdle',
  meta: [
    {
      name: 'description',
      content: 'Gim online tebak kata kerja bahasa arab',
    },
  ],
})
</script>

<template>
  <div class="grid index-page items-center xl:items-start overflow-y-auto">
    <GameGrid />
  </div>
  <KB />
</template>

<style lang="postcss" scoped>
.grid.index-page {
  height: calc(var(--main-height) - var(--keyboard-height));
}
</style>
