import { computedEager } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameGridStore, useGameStore } from '../store'

export function useRow(rowIndex: number) {
  const gameGridStore = useGameGridStore()
  const { activeCellIndex } = storeToRefs(gameGridStore)

  const gameStore = useGameStore()
  const { isFinished } = storeToRefs(gameStore)

  const rowStatus = computedEager(() => {
    if (activeCellIndex.value[0] > rowIndex) {
      return 'finished'
    }
    if (activeCellIndex.value[0] === rowIndex && isFinished.value) {
      return 'finished'
    }
    if (activeCellIndex.value[0] === rowIndex) {
      return 'active'
    }
    return 'inactive'
  })

  const isRowActive = computedEager(() => rowStatus.value === 'active')

  return { rowStatus, isRowActive, rowIndex }
}
