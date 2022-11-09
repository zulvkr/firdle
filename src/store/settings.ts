import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const persistentInfoModal = ref(false)

  return { persistentInfoModal }
})
