import Vuex from 'vuex';
import context from './context';
import network from './network';
import room from './room';
import auth from './auth';
import chat from './chat';

// Vue.use(Vuex);

export default new Vuex.Store({
  modules: { network, context, room, auth, chat }
});
