<template>
  <div>
    <h1>Usuarios</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col" class="d-none d-sm-table-cell">E-mail</th>
          <th scope="col">Rol</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" track-by="id">
          <td>{{ getFullName(user) }}</td>
          <td class="d-none d-sm-table-cell">{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <router-link :to="{ name: 'EditUser', params: { id: user.id } }">
              <icon name="pencil"></icon>
              <span class="d-none d-sm-inline-block">Editar</span>
            </router-link>
          </td>
          <td>
            <a href="#" class="text-danger" v-on:click.prevent.stop="onDeleteDialog(user.id)">
              <icon name="close"></icon>
              <span class="d-none d-sm-inline-block">Eliminar</span>
            </a>
          </td>
        </tr>
        <tr v-if="users.length == 0">
          <td colspan="4">No existen Usuarios.</td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <router-link to="/agregar-usuario" class="btn btn-info">
        <icon name="plus" class="pt-1"></icon>
        Agregar
      </router-link>
    </div>

    <!-- Modal -->
    <sweet-modal icon="warning" hide-close-button blocking overlay-theme="dark" ref="deleteModal">
      ¿Est&aacute;s seguro? <br/>
      Esta acci&oacute;n no se puede volver atr&aacute;s.

      <div class="text-right mt-3">
        <button class="btn btn-sm btn-danger" v-on:click="confirmDeletion()">Si</button>
        <button class="btn btn-sm btn-link" v-on:click="closeDialog()">Cancelar</button>
      </div>
    </sweet-modal>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SweetModal from 'sweet-modal-vue/src/components/SweetModal'
import VueNotifications from 'vue-notifications'

export default {
  name: 'users-list',
  components: {
    SweetModal
  },
  data () {
    return {
      toDelete: null
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  },
  methods: {
    ...mapActions([
      'deleteUser'
    ]),
    getFullName (user) {
      return user.first_name + ' ' + user.last_name
    },
    onDeleteDialog (userId) {
      this.$refs.deleteModal.open()
      this.toDelete = userId
    },
    confirmDeletion () {
      this.deleteUser(this.toDelete)
        .then((response) => this.notifySuccessDeletion())
      this.closeDialog()
    },
    closeDialog () {
      this.$refs.deleteModal.close()
    }
  },
  created () {
    this.$store.dispatch('fetchUsers')
  },
  notifications: {
    notifySuccessDeletion: {
      type: VueNotifications.types.success,
      title: '',
      message: 'Usuario eliminado'
    }
  }
}
</script>

<style scoped>
  a, a:hover { text-decoration: none; }
</style>
