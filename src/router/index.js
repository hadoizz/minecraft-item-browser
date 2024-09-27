import { createRouter, createWebHistory } from "vue-router";
import McHome from "@/views/McHome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: McHome,
      props: true,
    },
    // Remove or modify the old path if it's no longer needed
    // {
    //   path: '/minecraft-item-browser/:item_name?',
    //   name: 'OldPath',
    //   component: McHome,
    //   props: true,
    // },
  ],
});

export default router;
