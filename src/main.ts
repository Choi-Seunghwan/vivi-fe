import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/store';
import ServiceManager from '@/service/ServiceManager';
import MessageManager from '@/service/MessageManager';

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(servicePlugin);
app.provide('$service', new ServiceManager(app, store));
app.provide('$message', new MessageManager(app, store));

app.mount('#app');
