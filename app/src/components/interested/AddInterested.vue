<template>
  <div>
    <h1>Agregar Cliente Interesado</h1>
    <div class="row">
      <save-interested-form :interested="emptyInterested" :mode="'add'" v-on:submit="onFormSave" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInterestedForm from './SaveInterestedForm'

const initialData = () => {
  return {
    emptyInterested: {
      type: null,
      operation: null,
      info: null
    }
  }
}

export default {
  name: 'add-interested',
  components: {
    SaveInterestedForm
  },
  data: initialData,
  methods: {
    ...mapActions([
      'saveInterested'
    ]),
    onFormSave (interestedData) {
      interestedData.user_id = this.$store.getters.getLoggedInUser.id
      this.saveInterested(interestedData)
        .then(() => {
          this.notifySuccessCreation()
          let id = this.$store.getters.getInterestedJustCreatedId
          let route = (id) ? '/editar-interesado/' + id : '/interesados'
          this.$router.push(route)
        })
        .catch(() => this.notifyErrorCreation())
    }
  },
  notifications: {
    notifySuccessCreation: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Cliente interesado creado con éxito'
    },
    notifyErrorCreation: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  }
}
</script>

<style scoped>
h1 { font-size: 1.25rem; }
</style>
