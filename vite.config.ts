import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons({}),
    Components({
      dts: true,
      resolvers: [IconsResolver()],
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
})
