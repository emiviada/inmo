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

Vue.config.productionTip = false

// Plugins
Vue.use(VueResource)
// set the API root so we can use relative url's in our actions.
Vue.http.options.root = process.env.API_BASE_URL
Vue.http.headers.common['Content-Type'] = 'application/json'
Vue.use(BootstrapVue)
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
