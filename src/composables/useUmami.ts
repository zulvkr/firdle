import { useHead } from '@vueuse/head'

export function useUmami() {
  const isProduction = import.meta.env.VITE_NODE_ENV === 'production'
  const umamiSrc = import.meta.env.VITE_UMAMI_SRC
  const umamiId = import.meta.env.VITE_UMAMI_ID

  if (isProduction && umamiId && umamiSrc) {
    useHead({
      script: [
        {
          async: true,
          defer: true,
          'data-website-id': umamiId,
          src: umamiSrc,
        },
      ],
    })
  }
}
