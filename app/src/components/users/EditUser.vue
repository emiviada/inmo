<template>
  <div>
    <h1>Editar Usuario</h1>
    <div class="row">
      <save-user-form :user="user" :mode="'edit'" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveUserForm from './SaveUserForm'

export default {
  name: 'edit-user',
  components: {
    SaveUserForm
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions([
      'saveUser', 'showGoBack'
    ]),
    onFormSave (userData) {
      this.saveUser(userData)
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
      message: 'Usuario Editado con éxito'
    },
    notifyErrorEdition: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  },
  created () {
    this.showGoBack()
    this.$store.dispatch('fetchUser', this.$route.params.id)
  },
  mounted () {
    setTimeout(() => (this.user = {...this.$store.getters.getUser}), 300)
  }
}
</script>
