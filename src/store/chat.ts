const mockMesages = [
  {
    message: 'sdf',
    user: {
      id: 'ec2a06bf-e1bc-4b88-9c23-7c31d0c52497',
      email: 't1@t.com',
      nickname: 't2',
      updateDate: '2023-01-05T14:58:53.000Z',
      createdDate: '2023-01-05T14:58:53.000Z'
    },
    room: {
      id: 'c426fcca-38c6-4408-95cf-aa4090e58df7'
    },
    id: 'f8ca8dec-c9f7-4267-913c-170a1b24496a',
    createdDate: new Date('2023-02-14T15:40:12.000Z')
  }
];

type ChatState = {
  chatMessages: ChatMessage[];
};

const state: ChatState = {
  chatMessages: [...mockMesages]
};

const mutations = {
  setChatMessages: (state: ChatState, chatMessages: ChatMessage[]) => {
    state.chatMessages = chatMessages;
  }
};

const getters = {
  chatMessages: (state: ChatState) => {
    return state.chatMessages;
  }
};

const actions = {
  clearChatMessages({ commit }) {
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
