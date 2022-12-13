import store from '@/store/store';

export const authGuard = (to, from, next) => {
  const isLogin = store.getters['auth/isLogin'];
  const isAuthenticated = !!isLogin;

  if (isAuthenticated) next();

  /** @todo show Toast */
};
