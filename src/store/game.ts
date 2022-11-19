import { computedEager, useNow, useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

import { gameMessages } from '../composables/gameMessages'
import { answerMatch } from '../queries/type'
import { dayjs } from '../utils/dayjs'
import { snackbarBus } from './eventbus'
import { useGameGridStore } from './gameGrid'
import { useQueryCacheStore } from './queryCache'

export const useGameStore = defineStore('game', () => {
  const gameGridStore = useGameGridStore()
  const { activeCellIndex } = storeToRefs(gameGridStore)

  const queryCacheStore = useQueryCacheStore()
  const { answerMeta } = storeToRefs(queryCacheStore)

  const playStatus = useStorage<playStatus>('game-playstatus', 'unplayed')
  const winStatus = useStorage<winStatus>('game-winstatus', undefined)

  const isUnplayed = computedEager(() => playStatus.value === 'unplayed')
  const isPlaying = computedEager(() => playStatus.value === 'playing')
  const isFinished = computedEager(() => playStatus.value === 'finished')
  const isWin = computedEager(() => {
    return playStatus.value === 'finished' && winStatus.value === 'win'
  })
  const isLose = computedEager(() => {
    return playStatus.value === 'finished' && winStatus.value === 'lose'
  })
  const atLastRow = computedEager(() => activeCellIndex.value[0] === 5)

  const now = useNow({ interval: 1000 })
  const expTime = computed(() => dayjs(answerMeta.value.data.value?.data?.expTime))
  const timeToExp = computed(() => {
    return dayjs.duration(expTime.value.diff(now.value)).format('HH:mm:ss')
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
  }

  function lose() {
    playStatus.value = 'finished'
    winStatus.value = 'lose'
  }

  return {
    playStatus,
    winStatus,
    isWin,
    isLose,
    isUnplayed,
    isPlaying,
    isFinished,
    expTime,
    timeToExp,
    win,
    lose,
    evaluateStatus,
  }
})

type playStatus = 'unplayed' | 'playing' | 'finished'
type winStatus = 'win' | 'lose' | undefined

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
