import { storeToRefs } from 'pinia'

import { useGameGridStore, useQueryCacheStore } from '../store'
import { useResetGame } from './useResetGame'

export function useInitGame() {
  const queryCacheStore = useQueryCacheStore()
  const { answerMeta, localAnswerId } = storeToRefs(queryCacheStore)

  const gameGridStore = useGameGridStore()

  const { reset } = useResetGame()

  async function init() {
    await answerMeta.value.execute()
    /**
     * Fix for case when actveCellIndex was not updated on previous session
     * due to waiting for assignAnswerMatch to finish
     */
    gameGridStore.fixActiveCellIndexPosition()
    if (localAnswerId.value !== answerMeta.value.data.value?.data?.answerId) {
      reset()
      localAnswerId.value = answerMeta.value.data.value?.data?.answerId || 0
    }
  }

  return { init }
}
