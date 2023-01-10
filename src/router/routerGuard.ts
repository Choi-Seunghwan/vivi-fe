import { toast } from '@/utils';
import store from '@/store/store';

const isSignIn = () => {
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
    return;
  }
  return next();
};

export const authGuard = (to, from, next) => {
  if (!isSignIn()) return next({ name: 'Home' });
  return next();
};
