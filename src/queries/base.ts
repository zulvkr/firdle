import { createFetch } from '@vueuse/core'

export const useBaseFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})
