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
  all: []
}

// mutations
const mutations = {
  [FETCH_INMUEBLES] (state, inmuebles) {
    state.all = inmuebles
  },

  [CREATE_INMUEBLE] (state, response) {
    console.log(response, response.headers.get('Location')) // --> GET LOCATION header to redirect to just created object
    // Do nothing for now
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
