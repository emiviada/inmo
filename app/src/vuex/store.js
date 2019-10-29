import Vue from 'vue'
import Vuex from 'vuex'

import security from './modules/security'
import common from './modules/common'
import users from './modules/users'
import inmuebles from './modules/inmuebles'
import interested from './modules/interested'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    security,
    common,
    users,
    inmuebles,
    interested
  },
  strict: debug
})
