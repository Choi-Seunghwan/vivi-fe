import store from '@/store/store';

export const getAuthTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  return token || null;
};

export const setAuthTokenFromLocalStorage = token => {
  localStorage.setItem('token', token);
};

export const initAuth = () => {
  const token = getAuthTokenFromLocalStorage();
};
