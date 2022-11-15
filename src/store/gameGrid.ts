import { computedEager, promiseTimeout } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { ALEF_HAMZA_ABOVE, HAMZA, SHADDA } from '../constants/hijaiy'
import { answerMatch } from '../queries/type'
import { denormalizeFiil } from '../utils/denormalize'

export const useGameGridStore = defineStore('gameGrid', () => {
  const rowLength = 6
  const colLength = 4
  /**
   * The 2D array state of the game
   */
  const grid = ref([
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
  ] as Cell[][])

  /**
   * Hold results of the game
   */
  const results = ref([{}, {}, {}, {}, {}, {}] as Cell[])

  const gridWithResult = computed(() =>
    grid.value.map((row, i) => [{ ...results.value[i] }, ...row])
  )

  /**
   * Map grid as `cellIndex` array to traverse grid linearly
   */
  const gridMap = createGridMap()

  const activeCellIndex = ref<cellIndex>(gridMap[0])
  const atFirstCol = computedEager(() => activeCellIndex.value[1] < 3)
  const atLastCol = computedEager(() => activeCellIndex.value[1] > 0)

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
    const activeCell = getCell(activeCellIndex.value)
    if (!activeCell.cellText) {
      activeCell.cellText = value
      activeCell.cellLit = true
      setTimeout(() => {
        activeCell.cellLit = false
      }, 200)
    }
    if (atLastCol.value) {
      forward()
    }
  }

  function backspace() {
    let activeCell = getCell(activeCellIndex.value)
    if (!activeCell.cellText && atFirstCol.value) {
      back()
    }
    activeCell = getCell(activeCellIndex.value)
    activeCell.cellText = undefined
  }

  function clearLine() {
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

    const normalResult = grid.value[rowIndex].reduceRight((prev, curr, idx, arr) => {
      let harf = curr.cellText
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
    return grid.value[cellIndex[0]][cellIndex[1]]
  }

  function createGridMap() {
    const map: cellIndex[] = []
    for (let i = 0; i < rowLength; i++) {
      for (let j = colLength - 1; j >= 0; j--) {
        map.push([i, j])
      }
    }
    return map
  }

  function matchCellIndex(cellIndex1: cellIndex, cellIndex2: cellIndex) {
    return cellIndex1.every((val, index) => cellIndex2[index] === val)
  }

  async function assignAnswerMatch(answer: answerMatch[]) {
    const answerReversed = answer.slice().reverse()
    const activeRow = grid.value[activeCellIndex.value[0]]

    for (let i = activeRow.length - 1; i >= 0; i--) {
      await promiseTimeout(300)
      activeRow[i].cellAnswerMatch = answerReversed[i]
    }
  }

  return {
    grid,
    results,
    gridWithResult,
    gridMap,
    activeCellIndex,
    fill,
    backspace,
    clearLine,
    formResult,
    matchCellIndex,
    forward,
    assignAnswerMatch,
  }
})

export interface Cell {
  cellType?: string
  cellText?: string
  cellLit?: boolean
  cellContent?: unknown
  cellAnswerMatch?: answerMatch
}

/**
 * Mark position of a cell in format [rowIndex, colIndex]
 */
type cellIndex = [number, number]
