// import Vue from 'vue'

export const getInterested = state => state.all

/* export const getInmueble = state => {
  return (inmuebleId, edit) => {
    edit = edit || null
    let uri = 'inmuebles/' + inmuebleId
    if (edit) {
      uri += '?edit=1'
    }
    return Vue.http.get(uri)
      .then((response) => response.body.data)
  }
} */

export const getInterestedJustCreatedId = state => state.justCreatedId
