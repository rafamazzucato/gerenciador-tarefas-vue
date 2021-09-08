import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue'

import './assets/styles/app.scss';

Vue.use(VueResource);
Vue.use(BootstrapVue);

Vue.http.options.root = 'http://localhost:3000/api/';

new Vue({
  el: '#app',
  render: h => h(App)
})
