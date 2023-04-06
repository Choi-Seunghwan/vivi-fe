import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import SignIn from '@/pages/SignIn.vue';
import Room from '@/pages/Room.vue';
import Broadcast from '@/pages/Broadcast.vue';
// import NotFound from "@/pages/NotFound.vue";
import { BroadcastPageGuard, authGuard, globalGuard, signInPageGuard } from './routerGuard';
import { PATH_NAME_BROADCAST, PATH_NAME_HOME, PATH_NAME_ROOM, PATH_NAME_SIGN_IN } from '@/constant';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PATH_NAME_HOME,
      component: Home
    },
    {
      path: '/signIn',
      name: PATH_NAME_SIGN_IN,
      component: SignIn,
      beforeEnter: signInPageGuard
    },
    {
      path: '/room/:roomId',
      name: PATH_NAME_ROOM,
      component: Room
    },
    {
      path: '/broadcast',
      name: PATH_NAME_BROADCAST,
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

router.beforeEach(globalGuard);

export default router;
