import store from '@/store/store';

export const loginPageGuard = (to, from, next) => {
  const isLogin = store.getters['auth/isLogin'];
  const isAuthenticated = !!isLogin;

  if (!isAuthenticated) next();

  return { name: 'Home' };
};

export const authGuard = (to, from, next) => {
  const isLogin = store.getters['auth/isLogin'];
  const isAuthenticated = !!isLogin;

  if (isAuthenticated) next();
  return false;
  /** @todo show Toast */
};
