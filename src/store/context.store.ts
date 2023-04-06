import { TOP_NAV_DEFAULT } from '@/constant';

interface ContextState {
  isMobileSize: boolean | undefined;
  isDimmed: boolean;
  topNavContext: string;
  showGlobalProgress: boolean;
}

const state = (): ContextState => ({
  isMobileSize: undefined,
  isDimmed: false,
  topNavContext: TOP_NAV_DEFAULT,
  showGlobalProgress: false
});

const mutations = {
  setDimmed(state: ContextState, dimmed: boolean) {
    state.isDimmed = dimmed;
  },

  setTopNavContext(state: ContextState, topNavContext: string) {
    state.topNavContext = topNavContext;
  },

  setGlobalProgress(state: ContextState, showGlobalProgress: boolean) {
    state.showGlobalProgress = showGlobalProgress;
  }
};

const getters = {
  getTopNavContext: (state: ContextState) => state.topNavContext,
  showGlobalProgress: (state: ContextState) => state.showGlobalProgress
};

const actions = {
  initContext() {},

  setDimmed({ commit }, dimmed: boolean) {
    commit('setDimmed', dimmed);
  },

  setTopNavContext({ commit }, topNavContext: string) {
    commit('setTopNavContext', topNavContext);
  },

  setGlobalProgress({ commit }, showGlobalProgress: boolean) {
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
