import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const persistentInfoModal = useStorage('settings-persistentinfomodal', false)
  const vibrateKeyboard = useStorage('settings-vibratekeyboard', true)

  return { persistentInfoModal, vibrateKeyboard }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
