<template>
  <div>
    <h1>Agregar Inmueble</h1>
    <div class="row">
      <save-inmueble-form :inmueble="emptyInmueble" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SaveInmuebleForm from './SaveInmuebleForm'

const initialData = () => {
  return {
    emptyInmueble: {
      id: null,
      name: '',
      description: '',
      price: null
    }
  }
}

export default {
  name: 'add-inmueble',
  components: {
    SaveInmuebleForm
  },
  data: initialData,
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      console.log('inmueble Guardado con exito', JSON.stringify(inmuebleData))
      // this.saveInmueble(inmuebleData)
      this.$router.push('/inmuebles')
    }
  }
}
</script>