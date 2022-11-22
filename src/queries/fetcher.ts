import { createFetch } from '@vueuse/core'
import { Ref, computed, ref, watch } from 'vue'

import { answerMatch, getJSON } from './type'

const useBaseFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

export function useCountFiilQuery(result: Ref<string>) {
  const fetchPath = '/fiil/count'
  const fetchQuery = computed(() => {
    return new URLSearchParams({ value: result.value }).toString()
  })

  // update this state to trigger refetch
  const cachedRoute = ref(`${fetchPath}?${fetchQuery.value}`)

  watch(result, () => {
    if (result.value) {
      cachedRoute.value = `${fetchPath}?${fetchQuery.value}`
    }
  })

  const fetchRes = useBaseFetch(cachedRoute, {
    immediate: false,
    refetch: true,
  }).json<getJSON<'/fiil/count'>>()

  return fetchRes
}

export function useFiilQuery(result: Ref<string>) {
  const fetchPath = '/fiil'
  const fetchQuery = computed(() => {
    return new URLSearchParams({ value: result.value }).toString()
  })

  const fetchURL = computed(() => `${fetchPath}?${fetchQuery.value}`)

  const outSyncFetchResURL = ref('')

  const fetchRes = useBaseFetch(fetchURL, {
    immediate: false,
  }).json<getJSON<'/fiil/'>>()

  fetchRes.onFetchResponse(() => {
    outSyncFetchResURL.value = fetchURL.value
  })

  async function lazyExecute() {
    if (fetchURL.value !== outSyncFetchResURL.value) {
      await fetchRes.execute()
    }
  }

  return { ...fetchRes, lazyExecute }
}

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
