import * as getters from './getters'
import * as actions from './actions'

import {
  DELETE_INMUEBLE,
  CREATE_INMUEBLE,
  UPDATE_INMUEBLE
} from './mutation-types'

// initial state
const initialState = {
  all: [
    {
      id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
      type: 'Casa',
      location: 'San Martin 255, Río Tercero, Cba.',
      price: 399
    },
    {
      id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
      type: 'Depto',
      location: 'Obispo Trejo 1789 13 D, Córdoba',
      price: 1995
    },
    {
      id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
      type: 'Casa',
      location: 'Las Heras 255, Hernando, Cba.',
      price: 595
    },
    {
      id: 'abcd026b7-7f2f-1234-ace9-cc227e600000',
      type: 'Baldio',
      location: 'Calle s/n, Villa Maria, Cba.',
      price: 1000
    }
  ]
}

// mutations
const mutations = {
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
