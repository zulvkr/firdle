import { EventBusKey, useEventBus } from '@vueuse/core'

export interface snackbarOptions {
  status: 'error' | 'success' | 'info' | 'warning'
  message: string
}

const snackBarKey: EventBusKey<snackbarOptions> = Symbol('snackbar')
const kbEnterKey: EventBusKey<undefined> = Symbol('kbEnter')

export const snackbarBus = useEventBus(snackBarKey)
export const kbEnterBus = useEventBus(kbEnterKey)
