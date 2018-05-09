import Vue from 'vue'

export const getInmuebles = state => state.all

export const getInmueble = state => {
  return (inmuebleId, edit) => {
    edit = edit || null
    let uri = 'inmuebles/' + inmuebleId
    if (edit) {
      uri += '?edit=1'
    }
    return Vue.http.get(uri)
      .then((response) => response.body.data)
  }
}

export const getInmuebleJustCreatedId = state => state.justCreatedId
