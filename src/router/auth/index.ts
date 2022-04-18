import type { RouteRecordRaw } from "vue-router";
import Login from "@/views/auth/Login.vue";
import SignUp from "@/views/auth/SignUp.vue";
import ForgetPassword from "@/views/auth/ForgetPass.vue";
import VerifyEmail from "@/views/auth/VerifyEmail.vue";
import UserName from "@/views/auth/UserName.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/signup",
		name: "signup",
		component: SignUp,
	},
	{
		path: "/forget",
		name: "forgetpassword",
		component: ForgetPassword,
	},
	{
		path: "/verifyEmail",
		name: "verifyEmail",
		component: VerifyEmail,
		meta: { requireAuth: true },
	},
	{
		path: "/username",
		name: "username",
		component: UserName,
		meta: { requireAuth: true },
	},
];

export default routes;
