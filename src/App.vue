<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'

const { height } = useWindowSize()

</script>

<template>
  <AppAppBar />
  <main class="font-readex h-[var(--main-height)]">
    <router-view />
  </main>
</template>

<style lang="postcss">
@import url('./assets/fonts/fonts.css');
:root {
  --vh: 100vh;
  --main-height: var(--vh);
  --main-height: calc(var(--vh) - var(--mini-app-bar-height));
  @screen sm {
    --main-height: calc(var(--vh) - var(--app-bar-height));
  }
}
</style>
