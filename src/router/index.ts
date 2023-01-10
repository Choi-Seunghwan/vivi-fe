import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import SignIn from '@/pages/SignIn.vue';
import Room from '@/pages/Room.vue';
import Broadcast from '@/pages/Broadcast.vue';
// import NotFound from "@/pages/NotFound.vue";
import { BroadcastPageGuard, authGuard, signInPageGuard } from './routerGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: signInPageGuard
    },
    {
      path: '/room/:roomId',
      name: 'Room',
      component: Room
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast,
      beforeEnter: BroadcastPageGuard
    }
    // {
    //   path: "*",
    //   name: "notfound",
    //   component: NotFound,
    // },
  ]
});

export default router;
