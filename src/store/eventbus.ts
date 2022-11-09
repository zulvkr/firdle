import { defineStore } from 'pinia'

export interface snackbarOptions {
  status: 'error' | 'success' | 'info' | 'warning'
  message: string
}

export const useEventBus = defineStore('eventbus', () => {
  function kbEnter() {
    return
  }

  function snackbar(options: snackbarOptions) {
    return options
  }

  return { kbEnter, snackbar }
})
