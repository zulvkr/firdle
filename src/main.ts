import { ViteSSG } from 'vite-ssg'
import 'virtual:windi.css'
import App from './App.vue'
import Index from './components/pages/Index.vue'
import About from './components/pages/About.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
]

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
)
