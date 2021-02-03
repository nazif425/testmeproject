/* eslint-disable */

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import addIcons from "./icons";
import iconifyIcon from '@iconify/vue';
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueMaterial from "vue-material";
import VueForm from "vue-form";
import VueModalTor from "vue-modaltor";
import MdModalDialog from 'vue-material-modal-dialog'
import VueScrollTo from 'vue-scrollto';




addIcons(iconifyIcon)

Vue.prototype.$http = axios;
const token = localStorage.getItem("token")
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token
}/**/
Vue.use(MdModalDialog)
Vue.config.productionTip = false;
Vue.use(VueForm);
Vue.use(VueMaterial);
Vue.use(VueModalTor);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iconifyIcon);
Vue.use(VueScrollTo, {
  container: ".md-app-scroller",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.material.locale.dateFormat = 'yyyy-MM-dd'

new Vue({
  store,
  router,
  render: h => h (App)
}).$mount('#app')