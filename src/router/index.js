import { createRouter, createWebHistory } from "vue-router";
import McHome from "@/views/McHome.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),  // No base path, uses the root
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: "/:item_name?",
      name: "Home",
      component: McHome,
      props: true,
    },
    // Catch-all route for 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

export default router;
