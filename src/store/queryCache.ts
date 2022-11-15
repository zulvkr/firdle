import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useAnswerMetaQuery } from '../queries/fetcher'

/**
 * Store queries result that benefits from caching
 */
export const useQueryCacheStore = defineStore('query-cache', () => {
  const answerMeta = useAnswerMetaQuery()
  const computedAnswerMeta = computed(() => answerMeta)

  return {
    answerMeta: computedAnswerMeta,
  }
})
