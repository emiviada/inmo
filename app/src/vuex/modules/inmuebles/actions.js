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

export function fetchMyInmuebles ({ commit }) {
  return Vue.http.get('inmuebles/mine')
    .then((response) => commit(FETCH_INMUEBLES, response.body.data))
}

export function createInmueble ({ commit }, inmueble) {
  return Vue.http.post('inmuebles/', inmueble)
    .then((response) => commit(CREATE_INMUEBLE, response))
}

export function updateInmueble ({ commit }, inmueble) {
  let inmuebleId = inmueble.id
  delete inmueble.id
  return Vue.http.put('inmuebles/' + inmuebleId, inmueble)
    .then((response) => commit(UPDATE_INMUEBLE, response.body.data))
}

export function saveInmueble ({ commit, state }, inmueble) {
  delete inmueble.created_at
  delete inmueble.updated_at
  // update inmueble if ID is defined
  if (inmueble.id) {
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
