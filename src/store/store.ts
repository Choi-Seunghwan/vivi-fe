import Vuex, { Store } from 'vuex';
import context from './context';
import network from './network';
import room from './room';
import auth from './auth';
import chat from './chat';

// Vue.use(Vuex);
const store: Store<any> = new Vuex.Store({
  modules: { network, context, room, auth, chat }
});

export default store;
