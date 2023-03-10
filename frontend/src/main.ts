import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Toasted from 'vue-toasted';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import ConfirmPopup from 'primevue/confirmpopup';

import 'primevue/resources/themes/saga-blue/theme.css' 
import 'primevue/resources/primevue.min.css' 
import 'primeicons/primeicons.css' 


import ConfirmationService from 'primevue/confirmationservice';


var app = createApp(App);
app.use(ConfirmationService);
app.use(router).mount('#app')
app.use(PrimeVue);
app.use(ToastService);
app.component('Toast', Toast);

