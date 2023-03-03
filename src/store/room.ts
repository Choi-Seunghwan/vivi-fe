import _get from 'lodash/get';

interface RoomState {
  room: Room | null;
  showSettingPanel: boolean;
}

const state: RoomState = {
  room: null,
  showSettingPanel: true
};

const mutations = {
  setRoom: (state: RoomState, room: Room) => (state.room = room),
  setShowSettingPanel: (state: RoomState, value: boolean) => (state.showSettingPanel = value)
};

const getters = {
  // roomId: (state: RoomState) => state?.room?.roomId,
  isHost: (state: RoomState, getters, rootState, rootGatters) => {
    const user: User | null = getters.userInfo;

    if (!user) return false;
    if (user.id === state.room?.host?.id) return true;
    else return false;
  },

  getRoom: (state: RoomState) => state.room,

  isShowSettingPanel: (state: RoomState) => {
    if (state.showSettingPanel) return true;
    else return false;
  }
};

const actions = {
  setRoom({ commit }, { room }: { room: Room }) {
    commit('setRoom', room);
  },

  clearRoom({ commit }) {
    commit('setRoom', null);
  },

  setShowSettingPanel({ commit }, { value }) {
    commit('setShowSettingPanel', value);
  },

  addRoomMember({ state, commit }, { roomMember }) {
    const room: Room = state.room;
    room?.members?.push(roomMember);
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
