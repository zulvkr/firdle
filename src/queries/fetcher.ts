import { createFetch, useFetch } from '@vueuse/core'
import { computed, Ref, ref, watch } from 'vue'
import { getJSON } from './type'


const useBaseFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

function useCountFiilQuery(result: Ref<string>) {
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

function useFiilQuery(result: Ref<string>) {
  const fetchPath = '/fiil'
  const fetchQuery = computed(() => {
    return new URLSearchParams({ value: result.value }).toString()
  })
  const fetchURL = computed(() => `${fetchPath}?${fetchQuery.value}`)

  const fetchRes = useBaseFetch(fetchURL, {
    immediate: false,
  }).json<getJSON<'/fiil/'>>()

  return fetchRes
}

export { useCountFiilQuery, useFiilQuery }
