import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGameStore = defineStore('game', () => {
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
    grid.value.map((row, i) => [{ ...results.value[i], cellType: 'result' }, ...row])
  )

  /**
   * Map grid as `cellIndex` array
   */
  const gridMap = computed(() => createGridMap(grid.value))

  /**
   * Hold the state of active cell
   */
  const activeCellIndex = ref<cellIndex>(gridMap.value[0])

  /**
   * activeCell index in gridMap
   */
  const flatActiveCellIndex = computed(() => {
    const flatIndex = gridMap.value.findIndex((cellIndex) =>
      matchCellIndex(cellIndex, activeCellIndex.value)
    )
    return flatIndex
  })

  function fill(value: string) {
    const activeCell = getCell(activeCellIndex.value)
    activeCell.cellText = value
    if (flatActiveCellIndex.value < gridMap.value.length - 1) {
      forward()
    }
  }

  function backspace() {
    if (flatActiveCellIndex.value > 0) {
      back()
    }
    const activeCell = getCell(activeCellIndex.value)
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
    const nextIndex = gridMap.value[flatActiveCellIndex.value + 1]
    activeCellIndex.value = nextIndex
  }

  function back() {
    const prevIndex = gridMap.value[flatActiveCellIndex.value - 1]
    activeCellIndex.value = prevIndex
  }

  function getCell(cellIndex: cellIndex) {
    return grid.value[cellIndex[0]][cellIndex[1]]
  }

  function createGridMap(_grid: any[][]) {
    const map: cellIndex[] = []
    for (let i = 0; i < _grid.length; i++) {
      for (let j = _grid[0].length - 1; j >= 0; j--) {
        map.push([i, j])
      }
    }
    return map
  }

  function matchCellIndex(cellIndex1: cellIndex, cellIndex2: cellIndex) {
    return cellIndex1.every((val, index) => cellIndex2[index] === val)
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
  }
})

interface Cell {
  cellType?: string
  cellText?: string
}

/**
 * Mark position of a cell in format [rowIndex, colIndex]
 */
type cellIndex = [number, number]
