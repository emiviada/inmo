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

  [CREATE_INMUEBLE] (state, inmueble) {
    state.all.push(inmueble)
  },

  [UPDATE_INMUEBLE] (state, inmueble) {
    const index = state.all.findIndex((p) => p.id === inmueble.id)

    if (index !== -1) {
      // We need to replace the array entirely so that vue can recognize
      // the change and re-render entirely.
      // See http://vuejs.org/guide/list.html#Caveats
      state.all.splice(index, 1, inmueble)
    }
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
