const state = () => ({
  user: null
});

const mutations = {
  setUser: (state, v) => (state.user = v)
};

const getters = {
  isLogin(state) {
    return state.user ? true : false;
  },
  userInfo(state) {
    return state.user;
  }
};

const actions = {
  setUser({ commit }, { user }) {
    commit('setUser', user);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
