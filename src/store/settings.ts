import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const neverHasTutorial = useStorage('settings-neverHasTutorial', true)

  const persistentInfoModal = useStorage('settings-persistentinfomodal', false)
  const vibrateKeyboard = useStorage('settings-vibratekeyboard', true)
  const showTutorialAtStart = useStorage('settings-showTutorialAtStart', false)

  return {
    neverHasTutorial: skipHydrate(neverHasTutorial),
    persistentInfoModal: skipHydrate(persistentInfoModal),
    vibrateKeyboard: skipHydrate(vibrateKeyboard),
    showTutorialAtStart: skipHydrate(showTutorialAtStart),
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
