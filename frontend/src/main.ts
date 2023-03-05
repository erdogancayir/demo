import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted';

var app = createApp(App);
app.use(router).mount('#app')
