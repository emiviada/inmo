import Vue from 'vue'
import Vuex from 'vuex'

import security from './modules/security'
import users from './modules/users'
import inmuebles from './modules/inmuebles'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    security,
    users,
    inmuebles
  },
  strict: debug
})
