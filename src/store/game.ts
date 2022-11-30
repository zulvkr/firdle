import { computedEager, useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, skipHydrate, storeToRefs } from 'pinia'
import { watch } from 'vue'

import { gameMessages } from '../composables'
import { answerMatch } from '../queries/type'
import { snackbarBus } from './eventbus'
import { useGameGridStore } from './gameGrid'

export const useGameStore = defineStore('game', () => {
  const gameGridStore = useGameGridStore()
  const { atLastRow } = storeToRefs(gameGridStore)

  const playStatus = useStorage<playStatus>('game-playstatus', 'unplayed')
  const winStatus = useStorage<winStatus>('game-winstatus', 'unknown')

  const isUnplayed = computedEager(() => playStatus.value === 'unplayed')
  const isPlaying = computedEager(() => playStatus.value === 'playing')
  const isFinished = computedEager(() => playStatus.value === 'finished')
  const isWin = computedEager(() => {
    return playStatus.value === 'finished' && winStatus.value === 'win'
  })
  const isLose = computedEager(() => {
    return playStatus.value === 'finished' && winStatus.value === 'lose'
  })

  watch(winStatus, (val) => {
    if (val === 'win') {
      snackbarBus.emit({ message: gameMessages.snackbar.win, status: 'info' })
    }
    if (val === 'lose') {
      snackbarBus.emit({ message: gameMessages.snackbar.lose, status: 'info' })
    }
  })

  watch(atLastRow, (val) => {
    if (val) {
      snackbarBus.emit({ message: gameMessages.snackbar.last_try, status: 'info' })
    }
  })

  function evaluateStatus(answerMatch?: answerMatch[]) {
    const isAllMatched = answerMatch?.every((cellMatch) => cellMatch === 'matched')

    if (isAllMatched) {
      win()
      return
    }
    if (atLastRow.value) {
      lose()
      return
    }
    if (!atLastRow.value) {
      playStatus.value = 'playing'
      return
    }
  }

  function win() {
    playStatus.value = 'finished'
    winStatus.value = 'win'
    window?.umami?.('win')
  }

  function lose() {
    playStatus.value = 'finished'
    winStatus.value = 'lose'
    window?.umami?.('lose')
  }

  return {
    playStatus: skipHydrate(playStatus),
    winStatus: skipHydrate(winStatus),
    isWin,
    isLose,
    isUnplayed,
    isPlaying,
    isFinished,
    win,
    lose,
    evaluateStatus,
  }
})

type playStatus = 'unplayed' | 'playing' | 'finished'
type winStatus = 'win' | 'lose' | 'unknown'

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
