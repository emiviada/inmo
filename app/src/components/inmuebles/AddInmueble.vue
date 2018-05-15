<template>
  <div>
    <h1>Agregar Inmueble</h1>
    <div class="row">
      <save-inmueble-form :inmueble="emptyInmueble" :mode="'add'" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
  methods: {
    ...mapActions([
      'saveInmueble'
    ]),
    onFormSave (inmuebleData) {
      inmuebleData.user_id = this.$store.getters.getLoggedInUser.id
      this.saveInmueble(inmuebleData)
        .then(() => {
          this.notifySuccessCreation()
          let id = this.$store.getters.getInmuebleJustCreatedId
          let route = (id) ? '/editar-inmueble/' + id : '/inmuebles'
          this.$router.push(route)
        })
        .catch(() => this.notifyErrorCreation())
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
