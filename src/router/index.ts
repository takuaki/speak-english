import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import FillWords from "@/views/FillWords.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
			component: Home
    },
		{
			path: '/fillwords',
			name: 'fillwords',
			component: FillWords
		}
  ]
})

export default router
