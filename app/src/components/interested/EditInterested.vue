<template>
  <div>
    <h1>Editar Cliente Interesado</h1>
    <div class="row">
      <save-interested-form :interested="interested" :mode="'edit'" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveInterestedForm from './SaveInterestedForm'

export default {
  name: 'edit-interested',
  components: {
    SaveInterestedForm
  },
  data () {
    return {
      interested: {}
    }
  },
  methods: {
    ...mapActions([
      'saveInterested'
    ]),
    onFormSave (interestedData) {
      this.saveInterested(interestedData)
        .then(() => this.notifySuccessEdition())
        .catch(() => {
          this.notifyErrorEdition()
        })
    }
  },
  notifications: {
    notifySuccessEdition: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Cliente Interesado Editado con éxito'
    },
    notifyErrorEdition: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  },
  created () {
    this.$store.dispatch('fetchInterested', this.$route.params.id)
  },
  mounted () {
    setTimeout(() => (this.interested = {...this.$store.getters.getInterested}), 300)
  }
}
</script>

<style scoped>
h1 { font-size: 1.25rem; }
</style>
