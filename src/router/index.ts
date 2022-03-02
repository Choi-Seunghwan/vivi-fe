import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Room from "@/pages/Room.vue";
import Broadcast from "@/pages/Broadcast.vue";
// import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/room/:roomId",
      name: "room",
      component: Room,
    },
    {
      path: "/broadcast",
      name: "broadcast",
      component: Broadcast,
    },
    // {
    //   path: "*",
    //   name: "notfound",
    //   component: NotFound,
    // },
  ],
});

export default router;
