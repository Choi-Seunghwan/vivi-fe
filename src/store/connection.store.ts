import type { PeerConnection } from '@/modules/PeerConnection';

interface ConnectionState {
  peerConnections: Object;
}

const state = (): ConnectionState => ({
  peerConnections: {}
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
