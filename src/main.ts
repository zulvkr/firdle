import { createPinia } from 'pinia'
import 'virtual:windi.css'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import About from './components/pages/About.vue'
import Index from './components/pages/Index.vue'

const pinia = createPinia()

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
]

export const createApp = ViteSSG(App, { routes }, ({ app, router, initialState }) => {
  app.use(pinia)

  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value
  } else {
    pinia.state.value = initialState.pinia || {}
  }

  router.beforeEach((to, from, next) => {
    next()
  })
})
