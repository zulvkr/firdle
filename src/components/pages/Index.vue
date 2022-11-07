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
  <div class="grid index-page items-center xl:items-start">
    <GameGrid />
  </div>
  <KB />
</template>

<style lang="postcss" scoped>
.grid.index-page {
  --keyboard-height: 230px;
  --answer-height: 400px;
  /* Margin necessary to prevent some parts of grid hidden by keyboard */
  margin-bottom: var(--answer-height);
  height: calc(
    100vh - 230px
  ); /* Fallback for browsers that do not support Custom Properties */
  height: calc((var(--vh, 1vh) * 100) - var(--keyboard-height));
}
</style>
