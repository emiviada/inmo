import Vue from 'vue'

import {
  FETCH_INTERESTED,
  DELETE_INTERESTED,
  CREATE_INTERESTED,
  UPDATE_INTERESTED
} from './mutation-types'

export function fetchInterested ({ commit }, interestedId) {
  return Vue.http.get('interested/' + interestedId)
    .then((response) => commit(FETCH_INTERESTED, response.body.data))
}

export function fetchMyInterested ({ commit }) {
  return Vue.http.get('interested/mine')
    .then((response) => commit(FETCH_INTERESTED, response.body.data))
}

export function createInterested ({ commit }, interested) {
  return Vue.http.post('interested/', interested)
    .then((response) => commit(CREATE_INTERESTED, response))
}

export function updateInterested ({ commit }, interested) {
  let interestedId = interested.id
  delete interested.id
  return Vue.http.put('interested/' + interestedId, interested)
    .then((response) => commit(UPDATE_INTERESTED, response.body.data))
}

export function saveInterested ({ commit, state }, interested) {
  delete interested.created_at
  delete interested.updated_at
  // update interested if ID is defined
  if (interested.id) {
    return updateInterested({ commit }, interested)
  } else {
    delete interested.id
    return createInterested({ commit }, interested)
  }
}

export function deleteInterested ({ commit }, interestedId) {
  return Vue.http.delete('interested/' + interestedId)
    .then((response) => commit(DELETE_INTERESTED, interestedId))
}
