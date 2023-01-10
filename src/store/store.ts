import Vuex, { Store } from 'vuex';
import context from './context';
import room from './room';
import auth from './auth';
import chat from './chat';

// Vue.use(Vuex);
const store: Store<any> = new Vuex.Store({
  modules: { context, room, auth, chat }
});

export default store;
