// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VeeValidate from 'vee-validate'
import VueNotifications from 'vue-notifications'
import iziToast from 'izitoast' // https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'
import Loading from 'vue-loading-overlay' // https://github.com/ankurk91/vue-loading-overlay
import 'vue-loading-overlay/dist/vue-loading.min.css'

Vue.config.productionTip = false

// Plugins
Vue.use(VueResource)
// set the API root so we can use relative url's in our actions.
Vue.http.options.root = process.env.API_BASE_URL
Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.use(VeeValidate)
// Bootstrap
Vue.use(BootstrapVue)
Vue.use(Loading)

// Toast plugin
function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  let toastPosition = (document.documentElement.clientWidth >= 768) ? 'topRight' : 'bottomLeft'
  return iziToast[type]({title, message, timeout, position: toastPosition})
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
Vue.use(VueNotifications, options)

// Components
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
