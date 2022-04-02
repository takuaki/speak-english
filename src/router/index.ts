import { createRouter, createWebHistory } from "vue-router";
import authRoute from "@/router/auth/index";
import Top from "@/views/Top.vue";
import Home from "@/views/Home.vue";
import FillWords from "@/views/FillWords.vue";
//import Course from "@/views/Course.vue";
import DashBoard from "@/views/DashBoard.vue";
import Lessons from "@/views/Lessons.vue";
import Review from "@/views/Review.vue";
import AboutLevel from "@/views/about/AboutLevel.vue";

import auth from "@/server/api/authenticate";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "top",
			component: Top,
		},
		{
			path: "/home",
			name: "home",
			component: Home,
			meta: { requireAuth: true },
			children: [
				{
					path: "",
					component: DashBoard,
				},
				{
					path: "about/level",
					component: AboutLevel,
					name: "aboutLevel",
				},
				{
					path: "course/:course",
					component: Lessons,
					name: "course",
					props: true,
				},
				{
					path: "course/:course/lesson/:lesson",
					component: FillWords,
					props: true,
					name: "lesson",
				},
				{
					path: "course/:course/lesson/:lesson/review",
					component: Review,
					name: "review",
					props: true,
				},
			],
		},
		...authRoute,
	],
});

router.beforeEach((to, from) => {
	const user = auth.currentUser;
	/*if (to.meta.requireAuth) {
		if (user === null) {
			return {
				path: "/login",
				query: { redirect: to.fullPath },
			};
		} else if (user.displayName === null && to.name !== "username") {
			return {
				name: "username",
			};
		}
	}*/
});

export default router;
