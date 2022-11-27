import { useWindowSize } from '@vueuse/core'
import { watchEffect } from 'vue'

export function useVhWatcher() {
  const { height } = useWindowSize()
  watchEffect(() => {
    if (!import.meta.env.SSR) {
      document.documentElement.style.setProperty('--vh', `${height.value / 100}px`)
    }
  })
}
