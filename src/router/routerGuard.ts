import store from '@/store/store';

export const signInPageGuard = (to, from, next) => {
  const isLogin = store.getters['auth/isLogin'];
  const isAuthenticated = !!isLogin;

  if (!isAuthenticated) next();

  return next({ name: 'Home' });
};

export const authGuard = (to, from, next) => {
  const isLogin = store.getters['auth/isSignIn'];
  const isAuthenticated = !!isLogin;

  if (isAuthenticated) next();
  return false;
  /** @todo show Toast */
};
