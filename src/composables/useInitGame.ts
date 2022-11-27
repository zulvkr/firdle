import { storeToRefs } from 'pinia'

import { useQueryCacheStore } from '../store'
import { useResetGame } from './useResetGame'

export function useInitGame() {
  const queryCacheStore = useQueryCacheStore()
  const { answerMeta, localAnswerId } = storeToRefs(queryCacheStore)

  const { reset } = useResetGame()

  async function init() {
    await answerMeta.value.execute()
    if (localAnswerId.value !== answerMeta.value.data.value?.data?.answerId) {
      reset()
      localAnswerId.value = answerMeta.value.data.value?.data?.answerId || 0
    }
  }

  return { init }
}
