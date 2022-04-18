import { createRouter, createWebHistory } from "vue-router";
import authRoute from "@/router/auth/index";
import Top from "@/views/Top.vue";
import Home from "@/views/Home.vue";
import FillWords from "@/views/FillWords.vue";
import DashBoard from "@/views/DashBoard.vue";
import Review from "@/views/Review.vue";
import AboutLevel from "@/views/about/AboutLevel.vue";
import UserProfile from "@/views/auth/profile/UserProfile.vue";
import StudySetting from "@/views/auth/profile/StudySetting.vue";
import ProfileMenu from "@/components/menu/ProfileMenu.vue";

import auth from "@/server/api/authenticate";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/entry",
			name: "top",
			component: Top,
		},
		{
			path: "/",
			name: "home",
			component: Home,
			meta: { requireAuth: true },
			redirect: { name: "default" },
			children: [
				{
					path: "",
					name: "default",
					component: DashBoard,
				},
				{
					path: "about/level",
					component: AboutLevel,
					name: "aboutLevel",
				},
				{
					path: "level/:level",
					component: FillWords,
					props: true,
					//props: route=>({index:route.query.index})
					name: "study",
				},
				{
					path: "course/:course/lesson/:lesson/review",
					component: Review,
					name: "review",
					props: true,
				},
				{
					path: "user/:username/",
					name: "profile",
					props: true,
					components: {
						default: UserProfile,
						menu: ProfileMenu,
					},
					/*redirect: { name: "profile/default" },
					children: [
						{ path: "", component: UserProfile, name: "profile/default" },
						{ path: "study", component: StudySetting, name: "setting/study" },
					],*/
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
