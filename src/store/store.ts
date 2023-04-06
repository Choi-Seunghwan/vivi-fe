import Vuex, { Store } from 'vuex';
import context from './context.store';
import room from './room.store';
import auth from './auth.store';
import chat from './chat.store';
import connection from './connection.store';

// Vue.use(Vuex);
const store: Store<any> = new Vuex.Store({
  modules: { context, room, auth, chat, connection }
});

export default store;
