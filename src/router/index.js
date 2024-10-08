import { createRouter, createWebHistory } from "vue-router";
import McHome from "@/views/McHome.vue";

const router = createRouter({
  history: createWebHistory(),  // No base path, uses the root
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' },
    },
    {
      path: "/:item_name?",
      name: "Home",
      component: McHome,
      props: true,
    },
  ],
});

export default router;
