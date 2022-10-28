import { defineConfig,  } from 'windicss/helpers'

const sans = [
  'Readex Pro',
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji'
]

export default defineConfig({
  plugins: [require('windicss/plugin/aspect-ratio')],
  theme: {
    extend: {
      fontFamily: {
        readex: [
          'Readex Pro',
          ...sans
        ],
        IBM: [
          'IBM Plex Sans Arabic',
          ...sans
        ],
      }
    }
  }
  /* configurations... */
})
