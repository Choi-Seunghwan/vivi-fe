const state = () => ({
  user: null
});

const mutations = {
  setUser: (state, v) => (state.user = v)
};

const getters = {
  isSignIn(state): boolean {
    return !!state.user;
  },
  userInfo(state): User {
    return state.user;
  }
};

const actions = {
  setUser({ commit }, { user }: { user: User }) {
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
