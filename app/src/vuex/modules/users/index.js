import * as getters from './getters'
import * as actions from './actions'

import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER,
  GET_PROFILE
} from './mutation-types'

// initial state
const initialState = {
  all: [],
  justCreatedId: null,
  user: {},
  profile: {}
}

// mutations
const mutations = {
  [FETCH_USER] (state, user) {
    state.user = user
  },

  [FETCH_USERS] (state, users) {
    state.all = users
  },

  [CREATE_USER] (state, response) {
    let exploded = response.headers.get('Location').split('/')
    state.justCreatedId = exploded[exploded.length - 1]
  },

  [UPDATE_USER] (state, user, userId) {
    state.user.id = userId
  },

  [DELETE_USER] (state, userId) {
    state.all = state.all.filter(p => p.id !== userId)
  },

  [GET_PROFILE] (state, data) {
    state.profile = data
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
