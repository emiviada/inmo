import * as getters from './getters'
import * as actions from './actions'

import {
  FETCH_INMUEBLES,
  DELETE_INMUEBLE,
  CREATE_INMUEBLE,
  UPDATE_INMUEBLE
} from './mutation-types'

// initial state
const initialState = {
  all: [],
  justCreatedId: null
}

// mutations
const mutations = {
  [FETCH_INMUEBLES] (state, inmuebles) {
    state.all = inmuebles
  },

  [CREATE_INMUEBLE] (state, response) {
    let exploded = response.headers.get('Location').split('/')
    state.justCreatedId = exploded[exploded.length - 1]
  },

  [UPDATE_INMUEBLE] (state, inmueble) {
    // Do nothing for now
  },

  [DELETE_INMUEBLE] (state, inmuebleId) {
    state.all = state.all.filter(p => p.id !== inmuebleId)
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
