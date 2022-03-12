import type { Account } from '@/vivi-utils/types';

const state = () => ({
  info: null
});

const mutations = {
  setAccountInfo: (state, v) => (state.info = v)
};

const getters = {
  isLogin(state) {
    return state.info?.accountId ? true : false;
  },
  accountInfo(state) {
    return state.info;
  }
};

const actions = {
  setAccountInfo({ commit }, { account }: { account: Account }) {
    commit('setAccountInfo', account);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
