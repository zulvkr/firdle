<script lang="ts" setup>
import '@fontsource/ibm-plex-sans-arabic'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import { useWindowSize } from '@vueuse/core'
import { onMounted, watchEffect } from 'vue'

import { useInitGame } from './composables/useInitGame'
import { useTutorialModal } from './composables/useTutorialModal'

const { showTutorial } = useTutorialModal()
const { init } = useInitGame()

const { height } = useWindowSize()
watchEffect(() => {
  document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
})

onMounted(async () => {
  await init()
})
</script>

<template>
  <AppBar />
  <main class="font-IBM">
    <router-view />
  </main>
  <FSnackBar />
  <FModal v-model="showTutorial">
    <AppTutorial />
  </FModal>
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
