import Vue from 'vue'

import {
  SIGN_IN,
  SIGN_OUT
} from './mutation-types'

export function signIn ({ commit }, credentials) {
  return Vue.http.post('login', credentials)
    .then((response) => {
      let token = response.data.data.token
      Vue.http.headers.common['Authorization'] = `Bearer ${token}`
      commit(SIGN_IN, response.data)
    })
    .catch((response) => {
      return response
    })
}

export function signOut ({ commit }) {
  return Vue.http.post('logout', {foo: 'bar'}).then((response) => {
    delete Vue.http.headers.common['Authorization']
    commit(SIGN_OUT, response.data)
  }).catch((error) => {
    return error
  })
}
