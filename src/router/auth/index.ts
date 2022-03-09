import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/auth/Login.vue"
import SignUp from "@/views/auth/SignUp.vue"
import ForgetPassword from "@/views/auth/ForgetPass.vue"

const routes:RouteRecordRaw[] = [
	{	
		path: '/login',
		name: 'login',
		component:Login
	},
	{
		path: '/signup',
		name: 'signup',
		component:SignUp
	},
	{
		path: '/forget',
		name: 'forgetpassword',
		component: ForgetPassword	
	}
]

export default routes

