import { useBaseFetch } from './base'
import { getJSON } from './type'

export function useAnswerAnswerQuery() {
  const fetchURL = '/answer/answer'

  const fetchRes = useBaseFetch(fetchURL, {
    immediate: false,
  }).json<getJSON<'/answer/answer'>>()

  return fetchRes
}
