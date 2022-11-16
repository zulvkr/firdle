import { useNow, useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

import { gameMessages } from '../components/gameMessages'
import { dayjs } from '../utils/dayjs'
import { useEventBus } from './eventbus'
import { useGameGridStore } from './gameGrid'
import { useQueryCacheStore } from './queryCache'

export const useGameStore = defineStore('game', () => {
  const gameGridStore = useGameGridStore()
  const { activeCellIndex, grid } = storeToRefs(gameGridStore)

  const queryCacheStore = useQueryCacheStore()
  const { answerMeta } = storeToRefs(queryCacheStore)

  const eventbus = useEventBus()

  const playStatus = useStorage<playStatus>('game-playstatus', 'unplayed')
  const winStatus = useStorage<winStatus>('game-winstatus', undefined)

  const isUnplayed = computed(() => playStatus.value === 'unplayed')
  const isPlaying = computed(() => playStatus.value === 'playing')
  const isFinished = computed(() => playStatus.value === 'finished')
  const isWin = computed(
    () => playStatus.value === 'finished' && winStatus.value === 'win'
  )
  const isLose = computed(
    () => playStatus.value === 'finished' && winStatus.value === 'lose'
  )

  const now = useNow({ interval: 1000 })
  const expTime = computed(() => dayjs(answerMeta.value.data.value?.data?.expTime))
  const timeToExp = computed(() => {
    return dayjs.duration(expTime.value.diff(now.value)).format('HH:mm:ss')
  })

  watch(winStatus, (val) => {
    if (val === 'win') {
      eventbus.snackbar({ message: gameMessages.snackbar.win, status: 'info' })
    }
    if (val === 'lose') {
      eventbus.snackbar({ message: gameMessages.snackbar.win, status: 'info' })
    }
  })

  function evaluateStatus() {
    const activeRowIndex = activeCellIndex.value[0]
    const atLastRow = activeRowIndex === 5
    const isAllMatched = grid.value[activeRowIndex].every(
      ({ cellAnswerMatch }) => cellAnswerMatch === 'matched'
    )

    if (isAllMatched) {
      win()
      return
    }
    if (atLastRow) {
      lose()
      return
    }
    if (!atLastRow) {
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
