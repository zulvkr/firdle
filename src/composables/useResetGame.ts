import { storeToRefs } from 'pinia'

import { snackbarBus } from '../store/eventbus'
import { useGameStore } from '../store/game'
import { useGameGridStore } from '../store/gameGrid'

export function useResetGame() {
  const gameGridStore = useGameGridStore()
  const { gridMap } = gameGridStore
  const { activeCellIndex, grid, gridU, results } = storeToRefs(gameGridStore)

  const gameStore = useGameStore()
  const { playStatus, winStatus } = storeToRefs(gameStore)

  function resetGameGrid() {
    activeCellIndex.value = gridMap[0]
    grid.value = gameGridStore.createGrid()
    gridU.value = gameGridStore.createGrid()
    results.value = gameGridStore.createResultsCol()
  }

  function resetGameStore() {
    winStatus.value = 'unknown'
    playStatus.value = 'unplayed'
  }

  function reset() {
    resetGameGrid()
    resetGameStore()
    snackbarBus.emit({ status: 'info', message: 'Reset' })
  }

  return { reset }
}
