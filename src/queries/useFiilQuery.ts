import { Ref, computed, ref } from 'vue'

import { useBaseFetch } from './base'
import { getJSON } from './type'

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
