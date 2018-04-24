import { inmuebleTypes } from '@/common'

export const Utils = {
  methods: {
    getInmuebleType (inmuebleType) {
      return inmuebleTypes[inmuebleType]
    }
  }
}
