import { createRouter, createWebHistory, RouterView } from "vue-router";
import authRoute from "@/router/auth/index";
import Home from "@/views/Home.vue";
import FillWords from "@/views/FillWords.vue";
import Course from "@/views/Course.vue";
import Lessons from "@/views/Lessons.vue";
import Review from "@/views/Review.vue";
import auth from "@/server/api/authenticate";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "course",
          component: Course,
        },
        {
          path: "course/:course",
          component: Lessons,
          props: true,
        },
        {
          path: "course/:course/:lesson",
          component: FillWords,
          props: true,
        },
        {
          path: "course/:course/:lesson/review",
          component: Review,
          props: true,
        },
      ],
    },
    ...authRoute,
  ],
});

router.beforeEach((to, from) => {
  const user = auth.currentUser;
  if (to.meta.requireAuth && !user) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
