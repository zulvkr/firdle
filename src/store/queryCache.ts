import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed } from 'vue'

import { useAnswerMetaQuery } from '../queries/fetcher'

/**
 * Global Query store
 */
export const useQueryCacheStore = defineStore('query-cache', () => {
  const answerMeta = useAnswerMetaQuery()
  const computedAnswerMeta = computed(() => answerMeta)

  const localAnswerId = useStorage<number>('querycache-answerId', 0)

  return {
    answerMeta: computedAnswerMeta,
    localAnswerId,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQueryCacheStore, import.meta.hot))
}
