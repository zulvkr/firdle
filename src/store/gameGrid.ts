import { computedEager, promiseTimeout, useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'
import { computed, ref } from 'vue'

import { ALEF_HAMZA_ABOVE, HAMZA, SHADDA } from '../constants/hijaiy'
import { answerMatch } from '../queries/type'
import { denormalizeFiil } from '../utils/denormalize'

export const useGameGridStore = defineStore('gameGrid', () => {
  const gridYLength = 6
  const gridXLength = 4
  /**
   * The 2D array state of the game
   */
  const grid = useStorage('gamegrid-grid', createGrid() as Cell[][])

  /**
   * Store unpersisted data
   */
  const gridU = ref(createGrid() as UCell[][])

  /**
   * Hold results of the game
   */
  const results = useStorage('gamegrid-result', createResultsCol())

  const gridWithResult = computed(() =>
    grid.value.map((row, i) => [{ ...results.value[i] }, ...row])
  )

  /**
   * Map grid as `cellIndex` array to traverse grid linearly
   */
  const gridMap = createGridMap()

  const activeCellIndex = useStorage<cellIndex>('gamegrid-activecellindex', gridMap[0])
  const atFirstCol = computedEager(() => activeCellIndex.value[1] < 3)
  const atLastCol = computedEager(() => activeCellIndex.value[1] > 0)
  const atLastRow = computedEager(() => activeCellIndex.value[0] === 5)

  /**
   * Index of activeCell in gridMap
   */
  const flatActiveCellIndex = computed(() => {
    const flatIndex = gridMap.findIndex((cellIndex) =>
      matchCellIndex(cellIndex, activeCellIndex.value)
    )
    return flatIndex
  })

  function fill(value: string) {
    if (isAnswerLocked(activeCellIndex.value[0])) {
      return
    }
    const activeCell = getCell(activeCellIndex.value)
    if (!activeCell.p.cellText) {
      activeCell.p.cellText = value
      activeCell.u.cellLit = true
      setTimeout(() => {
        activeCell.u.cellLit = false
      }, 200)
    }
    if (atLastCol.value) {
      forward()
    }
  }

  function backspace() {
    if (isAnswerLocked(activeCellIndex.value[0])) {
      return
    }
    let activeCell = getCell(activeCellIndex.value)
    if (!activeCell.p.cellText && atFirstCol.value) {
      back()
    }
    activeCell = getCell(activeCellIndex.value)
    activeCell.p.cellText = undefined
  }

  function clearLine() {
    if (isAnswerLocked(activeCellIndex.value[0])) {
      return
    }
    const activeRowIndex = activeCellIndex.value[0]
    const activeRow = grid.value[activeRowIndex]
    for (const cell of activeRow) {
      cell.cellText = undefined
    }
    activeCellIndex.value = [activeRowIndex, 3]
  }

  function forward() {
    const nextIndex = gridMap[flatActiveCellIndex.value + 1]
    activeCellIndex.value = nextIndex
  }

  function back() {
    const prevIndex = gridMap[flatActiveCellIndex.value - 1]
    activeCellIndex.value = prevIndex
  }

  function formResult(rowIndex: number) {
    /**
     * Handle merging same harf
     * Change hamza to correct hamza form
     */
    if (!grid.value[rowIndex].every(({ cellText }) => cellText)) {
      return ''
    }

    const normalResult = grid.value[rowIndex].reduceRight((prev, curr, idx) => {
      let harf: string | undefined = curr.cellText
      if (harf === HAMZA) {
        if (idx > 0) {
          harf = ALEF_HAMZA_ABOVE
        }
      }
      if (harf === prev.slice(-1)) {
        harf = SHADDA
      }
      return prev + harf
    }, '')

    return denormalizeFiil(normalResult)
  }

  function getCell(cellIndex: cellIndex) {
    return {
      p: grid.value[cellIndex[0]][cellIndex[1]],
      u: gridU.value[cellIndex[0]][cellIndex[1]],
    }
  }

  function createGridMap() {
    const map: cellIndex[] = []
    for (let i = 0; i < gridYLength; i++) {
      for (let j = gridXLength - 1; j >= 0; j--) {
        map.push([i, j])
      }
    }
    return map
  }

  function createGrid() {
    const _grid = []
    for (let i = 0; i < gridYLength; i++) {
      _grid.push(createRow())
    }
    return _grid
  }

  function createRow() {
    const _row = []
    for (let j = gridXLength - 1; j >= 0; j--) {
      _row.push({})
    }
    return _row
  }

  function createResultsCol() {
    const _col: ResultCell[] = []
    for (let j = gridYLength - 1; j >= 0; j--) {
      _col.push({})
    }
    return _col
  }

  function matchCellIndex(cellIndex1: cellIndex, cellIndex2: cellIndex) {
    return cellIndex1.every((val, index) => cellIndex2[index] === val)
  }

  async function assignAnswerMatch(answer: answerMatch[], rowIndex: number) {
    const answerReversed = answer.slice().reverse()
    const row = gridU.value[rowIndex]

    for (let i = row.length - 1; i >= 0; i--) {
      await promiseTimeout(200)
      row[i].cellMatch = answerReversed[i]
    }
  }

  function isAnswerLocked(rowIndex: number) {
    return results.value[rowIndex].locked
  }

  return {
    grid: skipHydrate(grid),
    gridU: skipHydrate(gridU),
    results: skipHydrate(results),
    activeCellIndex: skipHydrate(activeCellIndex),
    gridWithResult,
    gridMap,
    atLastRow,
    assignAnswerMatch,
    fill,
    backspace,
    clearLine,
    formResult,
    matchCellIndex,
    forward,
    getCell,
    isAnswerLocked,
    createGrid,
    createRow,
    createResultsCol,
  }
})

export interface Cell {
  cellText?: string
  cellContent?: unknown
}

export interface ResultCell extends Cell {
  locked?: boolean
  answerMatch?: answerMatch[]
}

export interface UCell {
  cellLit?: boolean
  cellMatch?: answerMatch
}

/**
 * Mark position of a cell in format [rowIndex, colIndex]
 */
export type cellIndex = [number, number]

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameGridStore, import.meta.hot))
}
