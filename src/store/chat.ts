const state = () => ({});

const mutations = {};

const getters = {};

const actions = {
  /*
  handleMessage({ state, dispatch }, args) {
    const { method } = args;
    const splittedMethod = method.split('/');
    console.log('chat handleMessage', state, args);

    switch (splittedMethod[1]) {
      case 'receiveChatMessage': {
        dispatch('receiveChatMessage', args);
        break;
      }
      default: {
        break;
      }
    }
  }
  */
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
