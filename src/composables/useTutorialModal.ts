import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useSettingsStore } from '../store/settings'

const showTutorial = ref(false)

export function useTutorialModal() {
  const settingsStore = useSettingsStore()
  const { showTutorialAtStart } = storeToRefs(settingsStore)

  if (showTutorialAtStart.value) {
    setTimeout(() => {
      showTutorial.value = true
    }, 1500)
  }

  return { showTutorial }
}
