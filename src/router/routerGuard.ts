import { toast } from '@/utils';
import store from '@/store/store';
import type { RouteLocationNormalized } from 'vue-router';

export const globalGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const setTopNav = (val: boolean) => {
    store.dispatch('context/setTopNav', val);
  };
  if (to.name === 'Room' || to.name === 'Broadcast') setTopNav(false);
  else setTopNav(true);
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
