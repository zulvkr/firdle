import { Ref, computed } from 'vue'

import { useBaseFetch } from './base'
import { answerMatch, getJSON } from './type'

export function useAnswerMatchQuery(
  result: Ref<string>,
  cachedAnswer: Ref<answerMatch[] | undefined | null>
) {
  const fetchPath = '/answer/match'
  const fetchQuery = computed(() => {
    return new URLSearchParams({ value: result.value }).toString()
  })
  const fetchURL = computed(() => `${fetchPath}?${fetchQuery.value}`)

  const fetchRes = useBaseFetch(fetchURL, {
    immediate: false,
  }).json<getJSON<'/answer/match'>>()

  fetchRes.onFetchResponse(() => {
    cachedAnswer.value = fetchRes.data.value?.data?.answerMatch
  })

  return { ...fetchRes, cachedAnswer }
}
