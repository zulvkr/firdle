import { ViteSSG } from 'vite-ssg'
import 'virtual:windi.css'
import App from './App.vue'
import Index from './components/pages/Index.vue'
import About from './components/pages/About.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
]

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    app.use(pinia)

    if (import.meta.env.SSR) {
      initialState.pinia = pinia.state.value
    } else {
      pinia.state.value = initialState.pinia || {}
    }

    router.beforeEach((to, from, next) => {
      next()
    })
  }
)
