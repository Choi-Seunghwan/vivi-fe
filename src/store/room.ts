import _get from 'lodash/get';

interface RoomState {
  room: Room | null;
  // members: Member[];
}

const state: RoomState = {
  room: null
  // members: [],
  // chatMessages: []
};

const mutations = {
  setRoom: (state: RoomState, room: Room) => (state.room = room)
};

const getters = {
  // roomId: (state: RoomState) => state?.room?.roomId,
  isHost: (state: RoomState, getters, rootState, rootGatters) => {
    const user: User | null = getters.userInfo;

    if (!user) return false;
    if (user.id === state.room?.host?.id) return true;
    else return false;
  }
};

const actions = {
  setRoom({ commit }, { room }) {
    commit('setRoom', room);
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
