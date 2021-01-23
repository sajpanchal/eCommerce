import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import VueSession from 'vue-session'

import '@/assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const base = axios.create({
  baseURL: "http://localhost:3000",
});

Vue.prototype.$http = base;
Vue.use(VueSession);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
