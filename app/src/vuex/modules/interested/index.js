import * as getters from './getters'
import * as actions from './actions'

import {
  FETCH_INTERESTED,
  DELETE_INTERESTED,
  CREATE_INTERESTED,
  UPDATE_INTERESTED
} from './mutation-types'

// initial state
const initialState = {
  all: [],
  justCreatedId: null
}

// mutations
const mutations = {
  [FETCH_INTERESTED] (state, interested) {
    state.all = interested
  },

  [CREATE_INTERESTED] (state, response) {
    let exploded = response.headers.get('Location').split('/')
    state.justCreatedId = exploded[exploded.length - 1]
  },

  [UPDATE_INTERESTED] (state, interested) {
    // Do nothing for now
  },

  [DELETE_INTERESTED] (state, interestedId) {
    state.all = state.all.filter(p => p.id !== interestedId)
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
