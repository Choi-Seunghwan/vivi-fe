const state = () => ({
  isMobileSize: undefined,
  isDimmed: false,
  showSideNav: false,
  showTopNav: true,
  showGlobalProgress: false
});

const mutations = {
  setDimmed(state, dimmed) {
    state.isDimmed = dimmed;
  },

  setSideNav(state, showSideNav) {
    state.showSideNav = showSideNav;
  },

  setTopNav(state, showTopNav) {
    state.showTopNav = showTopNav;
  },

  setGlobalProgress(state, showGlobalProgress) {
    state.showGlobalProgress = showGlobalProgress;
  }
};

const getters = {
  showTopNav: state => state.showTopNav,
  showGlobalProgress: state => state.showGlobalProgress
};

const actions = {
  initContext() {},

  setDimmed({ commit }, dimmed) {
    commit('setDimmed', dimmed);
  },

  toggleSideNav({ state, commit }) {
    if (state.showSideNav) {
      commit('setSideNav', false);
      commit('setDimmed', false);
    } else {
      commit('setSideNav', true);
      commit('setDimmed', true);
    }
  },

  setSideNav({ commit }, showSideNav) {
    if (showSideNav) {
      commit('setSideNav', true);
      commit('setDimmed', true);
    } else {
      commit('setSideNav', false);
      commit('setDimmed', false);
    }
  },

  setTopNav({ commit }, showTopNav) {
    commit('setTopNav', showTopNav);
  },

  setGlobalProgress({ commit }, showGlobalProgress) {
    commit('setGlobalProgress', showGlobalProgress);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
