import Vuex from "vuex";
import context from "./context";
import network from "./network";
import room from "./room";
import account from "./account";
import chat from "./chat";

// Vue.use(Vuex);

export default new Vuex.Store({
  modules: { network, context, room, account, chat },
});
