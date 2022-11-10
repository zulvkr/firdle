import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useGameGridStore } from './gameGrid'

export const useGameStore = defineStore('game', () => {
  const gameGridStore = useGameGridStore()
  const { activeCellIndex, grid } = storeToRefs(gameGridStore)

  const playStatus = ref<playStatus>('unplayed')
  const winStatus = ref<winStatus>(undefined)

  const isUnplayed = computed(() => playStatus.value === 'unplayed')
  const isPlaying = computed(() => playStatus.value === 'playing')
  const isPlayed = computed(() => playStatus.value === 'played')
  const isWin = computed(
    () => playStatus.value === 'played' && winStatus.value === 'win'
  )
  const isLose = computed(
    () => playStatus.value === 'played' && winStatus.value === 'lose'
  )

  function evaluateStatus() {
    const activeRowIndex = activeCellIndex.value[0]
    const atLastRow = activeRowIndex === 5
    const isAllMatched = grid.value[activeRowIndex].every(
      ({ cellAnswerMatch }) => cellAnswerMatch === 'matched'
    )
    if (isAllMatched) {
      return win()
    }
    if (atLastRow) {
      return lose()
    }
    if (!atLastRow) {
      return playStatus.value === 'playing'
    }
  }

  function win() {
    playStatus.value = 'played'
    winStatus.value = 'win'
  }

  function lose() {
    playStatus.value = 'played'
    winStatus.value = 'lose'
  }
  return {
    playStatus,
    winStatus,
    isWin,
    isLose,
    isUnplayed,
    isPlaying,
    isPlayed,
    win,
    lose,
    evaluateStatus,
  }
})

type playStatus = 'unplayed' | 'playing' | 'played'
type winStatus = 'win' | 'lose' | undefined
