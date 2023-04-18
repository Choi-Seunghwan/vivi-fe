import { toast } from '@/utils';
import store from '@/store/store';
import type { RouteLocationNormalized } from 'vue-router';
import { PATH_NAME_BROADCAST, PATH_NAME_ROOM, TOP_NAV_BROADCAST_ROOM, TOP_NAV_DEFAULT } from '@/constant';

export const globalGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.name === PATH_NAME_ROOM || to.name === PATH_NAME_BROADCAST) {
    store.dispatch('context/setTopNavContext', TOP_NAV_BROADCAST_ROOM);
  } else {
    store.dispatch('context/setTopNavContext', TOP_NAV_DEFAULT);
  }
};

export const isSignIn = () => {
  const isSignIn = store.getters['auth/isSignIn'];
  return !!isSignIn;
};

export const signInPageGuard = (to, from, next) => {
  if (isSignIn()) return next({ name: 'Home' });
  return next();
};

export const BroadcastPageGuard = (to, from, next) => {
  if (!isSignIn()) {
    toast.showToast('need login');
    return next({ name: 'Home' });
  }
  return next();
};

export const authGuard = (to, from, next) => {
  if (!isSignIn()) return next({ name: 'Home' });
  return next();
};
