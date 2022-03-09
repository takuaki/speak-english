import { createRouter, createWebHistory, RouterView } from 'vue-router'
import authRoute from "@/router/auth/index"
import Home from "@/views/Home.vue"
import FillWords from "@/views/FillWords.vue"
import Course from "@/views/Course.vue"
import Lessons from "@/views/Lessons.vue"
import Review from "@/views/Review.vue"
import Login from "@/views/auth/Login.vue"
//import SignUp from "@/views/auth/SignUp.vue"
import SignUp from "@/views/auth/SignUp.vue"
import ForgetPassword from "@/views/auth/ForgetPass.vue"

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
				},{
					path: 'course/:course/:lesson/review',
					component: Review,
					props: true
				}
			]
		},
		...authRoute
  ]
})

export default router
