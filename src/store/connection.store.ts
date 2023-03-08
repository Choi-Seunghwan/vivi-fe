import type { PeerConnection } from '@/modules/PeerConnection';

interface ConnectionState {
  peerConnections: PeerConnection[] | null;
}

const state = (): ConnectionState => ({
  peerConnections: null
});

const mutations = {
  setPeerConnections: (state, v) => (state.peerConnections = v)
};

const getters = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
