import Vue from 'vue'
import uuid from 'uuid'

import {
  FETCH_INMUEBLES,
  DELETE_INMUEBLE,
  CREATE_INMUEBLE,
  UPDATE_INMUEBLE
} from './mutation-types'

export function fetchInmuebles ({ commit }) {
  return Vue.http.get('inmuebles/')
    .then((response) => commit(FETCH_INMUEBLES, response.body.data))
}

export function saveInmueble ({ commit, state }, inmueble) {
  const index = state.all.findIndex((p) => p.id === inmueble.id)

  // update inmueble if it exists or create it if it doesn't
  if (index !== -1) {
    commit(UPDATE_INMUEBLE, inmueble)
  } else {
    inmueble.id = uuid.v4()
    commit(CREATE_INMUEBLE, inmueble)
  }
}

export function deleteInmueble ({ commit }, inmuebleId) {
  return Vue.http.delete('inmuebles/' + inmuebleId)
    .then((response) => commit(DELETE_INMUEBLE, inmuebleId))
}
