import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";

import moduleLoader from "@/modules/moduleLoader";
import { servicePlugin, ServiceManager } from "@/service";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(servicePlugin);
app.mount("#app");
