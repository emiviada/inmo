import Vue from 'vue'

export const getInmuebles = state => state.all

export const getInmueble = state => {
  return (inmuebleId) => {
    return Vue.http.get('inmuebles/' + inmuebleId)
      .then((response) => response.body.data)
  }
}

export const getJustCreatedId = state => state.justCreatedId
