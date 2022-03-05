import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import FillWords from "@/views/FillWords.vue"
import Course from "@/views/Course.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
			component: Home,
			children:[
				{
					path: '/course',
					component:Course,
					name:'course'
				},
				
			]
    },
		{
			path: '/fillwords',
			name: 'fillwords',
			component: FillWords
		}
  ]
})

export default router
