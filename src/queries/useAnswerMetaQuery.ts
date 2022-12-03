import { useBaseFetch } from './base'
import { getJSON } from './type'

export function useAnswerMetaQuery() {
  const fetchURL = '/answer/meta'

  const fetchRes = useBaseFetch(fetchURL, { immediate: false }).json<
    getJSON<'/answer/meta'>
  >()

  return fetchRes
}
