<script lang="ts" setup>
import '@fontsource/ibm-plex-sans-arabic'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'

import { useUmami, useVhWatcher } from './composables'

useVhWatcher()
useUmami()
</script>

<template>
  <AppBar />
  <main class="font-IBM">
    <router-view />
  </main>
  <FSnackBar />
</template>

<style lang="postcss">
:root {
  --100vh: 100vh;
  --100vh: calc(var(--vh, 1vh) * 100);

  /** use custom 100vh in iOS only */
  /* @supports (-webkit-touch-callout: none) {
    --100vh: calc(var(--vh, 1vh) * 100);
  } */
  --main-height: calc(var(--100vh) - var(--mini-app-bar-height));
  @screen sm {
    --main-height: calc(var(--100vh) - var(--app-bar-height));
  }
}

body {
  touch-action: pan-x pan-y;
}
</style>
