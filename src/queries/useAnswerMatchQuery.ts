import { Ref, computed } from 'vue'

import { useBaseFetch } from './base'
import { answerMatch, getJSON } from './type'

export function useAnswerMatchQuery(
  result: Ref<string>,
  cachedAnswer: Ref<answerMatch[] | undefined | null>
) {
  const fetchPath = '/answer'
  const fetchQuery = computed(() => {
    return new URLSearchParams({ value: result.value }).toString()
  })
  const fetchURL = computed(() => `${fetchPath}?${fetchQuery.value}`)

  const fetchRes = useBaseFetch(fetchURL, {
    immediate: false,
  }).json<getJSON<'/answer/'>>()

  fetchRes.onFetchResponse(() => {
    cachedAnswer.value = fetchRes.data.value?.data?.answer
  })

  return { ...fetchRes, cachedAnswer }
}

export function useAnswerMetaQuery() {
  const fetchURL = '/answer/meta'

  const fetchRes = useBaseFetch(fetchURL, { immediate: false }).json<
    getJSON<'/answer/meta'>
  >()

  return fetchRes
}
