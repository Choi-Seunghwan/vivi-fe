import _get from 'lodash/get';

interface RoomState {
  room: Room | null;
  // members: Member[];
  localStream: any;
  roomConnectionStatus: 'NONE' | 'CONNECTING' | 'COMPLETE';
  // chatMessages: ChatMessage[];
}

const state: RoomState = {
  room: null,
  // members: [],
  localStream: null,
  roomConnectionStatus: 'NONE',
  // chatMessages: []
};

const mutations = {
  setRoom: (state: RoomState, room: Room) => (state.room = room),
  setRoomConnectionStatus: (state: RoomState, status) => (state.roomConnectionStatus = status),
  // setChatMessages: (state: RoomState, messages) => (state.chatMessages = messages)
};

const getters = {
  // roomId: (state: RoomState) => state?.room?.roomId,
  localStream: (state: RoomState) => state.localStream
};

const actions = {
  /*
  async handleMessage({ state, commit, dispatch }, args) {
    const { method, result, statusCode } = args;
    const splittedMethod = method.split('/');

    switch (splittedMethod[1]) {
      default:
        break;
    }
  }
  */
  setRoom({ commit }, { room }) {
    commit('setRoom', room);
  },

  setRoomConnectionStatus({ commit }, { status }) {
    commit('setRoomConnectionStatus', status);
  },

  leaveRoom({ commit, dispatch }) {
    commit('setChatMessages', []);
    dispatch('setRoom', { room: null });
    dispatch('setRoomConnectionStatus', { status: 'NONE' });
  },

  // pushChatMessage({ state, commit }, { chatMessage }: { chatMessage: ChatMessage }) {
  //   commit('setChatMessages', [chatMessage, ...state.chatMessages]);
  // }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
