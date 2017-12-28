import uuid from 'uuid'

import {
  DELETE_INMUEBLE,
  CREATE_INMUEBLE,
  UPDATE_INMUEBLE
} from './mutation-types'

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
  commit(DELETE_INMUEBLE, inmuebleId)
}
