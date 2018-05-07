import * as getters from './getters'
import * as actions from './actions'

import {
  SIGN_IN,
  SIGN_OUT
} from './mutation-types'

const USER_VAR_NAME = 'inmo_user'
// initial state
const defaultState = { token: null }
const initialState = {
  user: JSON.parse(localStorage.getItem(USER_VAR_NAME)) || defaultState
}

// Mutations
const mutations = {
  [SIGN_IN] (state, data) {
    state.user = data.data
    localStorage.setItem(USER_VAR_NAME, JSON.stringify(state.user))
  },

  [SIGN_OUT] (state, data) {
    state.user = defaultState
    localStorage.removeItem(USER_VAR_NAME)
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
