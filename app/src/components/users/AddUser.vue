<template>
  <div>
    <h1>Agregar Usuario</h1>
    <div class="row">
      <save-user-form :user="emptyUser" :mode="'add'" v-on:submit="onFormSave"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'
import SaveUserForm from './SaveUserForm'

var bcrypt = require('bcryptjs')

const initialData = () => {
  return {
    emptyUser: {
      first_name: null,
      last_name: null,
      email: null,
      password: null
    }
  }
}

export default {
  name: 'add-user',
  components: {
    SaveUserForm
  },
  data: initialData,
  methods: {
    ...mapActions([
      'saveUser'
    ]),
    onFormSave (userData) {
      delete userData.confirm_password
      var saltRounds = 10
      userData.password = bcrypt.hashSync(userData.password, saltRounds)
      this.saveUser(userData)
        .then(() => {
          this.notifySuccessCreation()
          let id = this.$store.getters.getUserJustCreatedId
          let route = (id) ? '/editar-usuario/' + id : '/usuarios'
          this.$router.push(route)
        })
        .catch(() => this.notifyErrorCreation())
    }
  },
  notifications: {
    notifySuccessCreation: {
      type: VueNotifications.types.success,
      title: 'Felicitaciones',
      message: 'Usuario creado con éxito'
    },
    notifyErrorCreation: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  }
}
</script>
