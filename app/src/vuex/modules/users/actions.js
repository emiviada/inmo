import Vue from 'vue'

import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER
} from './mutation-types'

export function fetchUser ({ commit }, userId) {
  return Vue.http.get('users/' + userId)
    .then((response) => commit(FETCH_USER, response.body.data))
}

export function fetchUsers ({ commit }) {
  return Vue.http.get('users/')
    .then((response) => commit(FETCH_USERS, response.body.data))
}

export function createUser ({ commit }, user) {
  return Vue.http.post('users/', user)
    .then((response) => commit(CREATE_USER, response))
}

export function updateUser ({ commit }, user) {
  let userId = user.id
  return Vue.http.put('users/' + userId, user)
    .then((response) => commit(UPDATE_USER, response.body.data, userId))
}

export function saveUser ({ commit, state }, user) {
  // update user if ID is defined
  if (user.id) {
    return updateUser({ commit }, user)
  } else {
    delete user.id
    return createUser({ commit }, user)
  }
}

export function deleteUser ({ commit }, userId) {
  return Vue.http.delete('users/' + userId)
    .then((response) => commit(DELETE_USER, userId))
}
