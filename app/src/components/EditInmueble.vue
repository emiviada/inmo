<template>
  <div>
    <h1>Editar Inmueble</h1>
    <div class="row">
      <save-inmueble-form :inmueble="inmueble" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SaveInmuebleForm from './SaveInmuebleForm'

export default {
  name: 'edit-inmueble',
  components: {
    SaveInmuebleForm
  },
  data () {
    return {
      inmueble: {}
    }
  },
  computed: mapGetters(['getInmueble']),
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      console.log('inmueble Editado con exito', JSON.stringify(inmuebleData))
      this.saveInmueble(inmuebleData)
      this.$router.push('/inmuebles')
    }
  },
  mounted () {
    this.inmueble = { ...this.getInmueble(this.$route.params.id) }
  }
}
</script>