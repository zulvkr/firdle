import { defineStore } from 'pinia'

export const useEventBus = defineStore('eventbus', () => {
  function kbEnter() {
    return
  }

  return { kbEnter }
})
