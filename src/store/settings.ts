import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const persistentInfoModal = useStorage('settings-persistentinfomodal', false)
  const vibrateKeyboard = useStorage('settings-vibratekeyboard', true)
  const showTutorialAtStart = useStorage('settings-showTutorialAtStart', true)

  return { persistentInfoModal, vibrateKeyboard, showTutorialAtStart }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
