<template>
  <div>
    <h1>Agregar Inmueble</h1>
    <div class="row">
      <save-inmueble-form :inmueble="emptyInmueble" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInmuebleForm from './SaveInmuebleForm'

const initialData = () => {
  return {
    emptyInmueble: {
      id: null,
      type: null
    }
  }
}

export default {
  name: 'add-inmueble',
  components: {
    SaveInmuebleForm
  },
  data: initialData,
  computed: mapGetters(['getJustCreatedId']),
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      // console.log('inmueble Guardado con exito', JSON.stringify(inmuebleData))
      var _this = this
      this.saveInmueble(inmuebleData)
        .then(() => {
          _this.notifySuccessCreation()
          let id = this.$store.getters.getJustCreatedId
          let route = (id) ? '/editar-inmueble/' + id : '/inmuebles'
          this.$router.push(route)
        })
        .catch(() => _this.notifyErrorCreation())
    }
  },
  notifications: {
    notifySuccessCreation: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Inmueble creado con éxito'
    },
    notifyErrorCreation: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  }
}
</script>
