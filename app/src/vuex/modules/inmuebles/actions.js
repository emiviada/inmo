import Vue from 'vue'

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

export function createInmueble ({ commit }, inmueble) {
  return Vue.http.post('inmuebles/', inmueble)
    .then((response) => commit(CREATE_INMUEBLE, response))
}

export function updateInmueble ({ commit }, inmueble) {
  return Vue.http.put('inmuebles/' + inmueble.id, inmueble)
    .then((response) => commit(UPDATE_INMUEBLE, response.body.data))
}

export function saveInmueble ({ commit, state }, inmueble) {
  const index = state.all.findIndex((p) => p.id === inmueble.id)

  // update inmueble if it exists or create it if it doesn't
  if (index !== -1) {
    return updateInmueble({ commit }, inmueble)
  } else {
    delete inmueble.id
    return createInmueble({ commit }, inmueble)
  }
}

export function deleteInmueble ({ commit }, inmuebleId) {
  return Vue.http.delete('inmuebles/' + inmuebleId)
    .then((response) => commit(DELETE_INMUEBLE, inmuebleId))
}
