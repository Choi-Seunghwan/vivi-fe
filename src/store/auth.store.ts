const state = () => ({
  user: null,
  token: null
});

const mutations = {
  setUser: (state, v) => (state.user = v),
  setAuthToken: (state, v) => (state.token = v)
};

const getters = {
  isSignIn(state): boolean {
    return !!state.user;
  },
  userInfo(state): User {
    return state.user;
  },
  authToken(state) {
    return state?.token;
  }
};

const actions = {
  setUser({ commit }, { user }: { user: User }) {
    commit('setUser', user);
    if (user.token) commit('setAuthToken', user.token);
  },

  signOff({ commit }) {
    commit('setUser', null);
    commit('setAuthToken', null);
  },

  setAuthToken({ commit }, { token }: { token: string }) {
    commit('setAuthToken', token);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
