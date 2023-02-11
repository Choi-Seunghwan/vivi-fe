type ChatState = {
  chatMessages: ChatMessage[];
};

const state: ChatState = {
  chatMessages: []
};

const mutations = {
  setChatMessages: (state: ChatState, chatMessages: ChatMessage) => {
    state.chatMessages = chatMessages;
  }
};

const getters = {
  chatMessages: (state: ChatState) => {
    return state.chatMessages;
  }
};

const actions = {
  clearChatMessages({ commit }, {}) {
    commit('setChatMessages', []);
  },

  addChatMessage({ commit, state }, { chatMessage }) {
    const newChatMessages = [...state.chatMessages, chatMessage];
    commit('setChatMessages', newChatMessages);
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
