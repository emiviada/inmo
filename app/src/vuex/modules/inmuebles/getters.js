export const getInmuebles = state => state.all

export const getInmueble = state => {
  return (inmuebleId) => {
    const index = state.all.findIndex((p) => p.id === inmuebleId)
    return state.all[index]
  }
}
