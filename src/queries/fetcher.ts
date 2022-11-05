import { useFetch } from '@vueuse/core'
import { computed, Ref, ref, watch } from 'vue'

interface BaseResponse {
  status: number
}

interface CountResponse extends BaseResponse {
  count: number
}

const baseURLString = 'https://basket.uno.ivanzulfikar.com'

function createFetchPath(path: string) {
  const url = new URL(baseURLString)
  url.pathname = path
  return url.toString()
}

function useCountFiilQuery(result: Ref<string>) {
  const fetchPath = createFetchPath('/firdle-count-fiil')
  const fetchQuery = computed(() => {
    return new URLSearchParams({ count: 'true', result: result.value }).toString()
  })

  // update this state to trigger refetch
  const cachedRoute = ref(`${fetchPath}?${fetchQuery.value}`)

  watch(result, () => {
    if (result.value) {
      cachedRoute.value = `${fetchPath}?${fetchQuery.value}`
    }
  })

  const fetchRes = useFetch(cachedRoute, {
    immediate: false,
    refetch: true,
  }).json<CountResponse>()

  const isExist = computed(() => {
    if (!fetchRes.isFinished.value) {
      return null
    }
    if ((fetchRes.data.value?.count ?? 0) > 0) {
      return true
    }
    return false
  })

  return { isExist, ...fetchRes }
}

function useFiilQuery(result: Ref<string>) {
  const fetchPath = createFetchPath('/firdle-fiil')
  const fetchQuery = computed(() => {
    return new URLSearchParams({ result: result.value }).toString()
  })
  const fetchURL = computed(() => `${fetchPath}?${fetchQuery.value}`)

  const fetchRes = useFetch(fetchURL, {
    immediate: false,
  }).json()

  return fetchRes
}

export { useCountFiilQuery, useFiilQuery }
