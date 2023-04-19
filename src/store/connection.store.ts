import type { PeerConnection } from '@/modules/PeerConnection';

export type PcMap = Map<string, PeerConnection>;

interface ConnectionState {
  peerConnections: Map<string, PeerConnection>; // key: member Id
}

const state = (): ConnectionState => ({
  peerConnections: new Map()
});

const mutations = {
  setPeerConnections: (state: ConnectionState, v) => (state.peerConnections = v)
};

const getters = {
  getPeerConnection: (state: ConnectionState) => {
    return state.peerConnections;
  }
};

const actions = {
  setPc({ state }: { state: ConnectionState }, { pc }: { pc: PeerConnection }) {
    const peerConnections = state.peerConnections;
    const key = pc.member.id;
    peerConnections.set(key, pc);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
