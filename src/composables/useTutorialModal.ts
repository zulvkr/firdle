import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useSettingsStore } from '../store'

const showTutorial = ref(false)

export function useTutorialModal() {
  const settingsStore = useSettingsStore()
  const { showTutorialAtStart, neverHasTutorial } = storeToRefs(settingsStore)

  function showInitialTutorial() {
    setTimeout(() => {
      showTutorial.value = true
    }, 1500)
  }

  if (neverHasTutorial.value || showTutorialAtStart.value) {
    showInitialTutorial()

    if (neverHasTutorial.value) {
      neverHasTutorial.value = false
    }
  }

  return { showTutorial }
}
