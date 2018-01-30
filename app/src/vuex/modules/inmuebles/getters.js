import Vue from 'vue'

export const getInmuebles = state => state.all

export const getInmueble = state => {
  return (inmuebleId) => {
    // const index = state.all.findIndex((p) => p.id === inmuebleId)
    // return state.all[index]
    return Vue.http.get('inmuebles/' + inmuebleId)
      .then((response) => response.body.data[0])
  }
}
