import { useHead } from '@vueuse/head'

export function useUmami() {
  const isProduction = import.meta.env.NODE_ENV === 'production'

  if (isProduction) {
    useHead({
      script: [
        {
          async: true,
          defer: true,
          'data-website-id': '5f0f63ca-856e-436b-b3f0-053f7781348d',
          src: 'https://firdle-umami.f8fbipzggp6ji6q3.protbk.com/umami.js',
        },
      ],
    })
  }
}
