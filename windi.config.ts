import { defineConfig } from 'windicss/helpers'

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
  'Noto Color Emoji',
]

const serif = ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']

export default defineConfig({
  plugins: [
    require('windicss/plugin/aspect-ratio'),
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        IBM: ['IBM Plex Sans Arabic', ...sans],
        lateef: ['Lateef', ...serif],
      },
    },
  },
  /* configurations... */
})
