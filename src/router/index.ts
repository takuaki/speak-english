import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import FillWords from "@/views/FillWords.vue"
import Course from "@/views/Course.vue"
import Lessons from "@/views/Lessons.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
			component: Home,
			children:[
				{
					path: 'course',
					component:Course,
				},
				{
					path: 'course/:course',
					component: Lessons,
					props:true
				},
				{
					path: 'course/:course/:lesson',
					component: FillWords,
					props:true,
				}
			]
    },
  ]
})

export default router
