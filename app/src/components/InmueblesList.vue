<template>
  <div>
    <h1>Inmuebles</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Tipo de Inmueble</th>
          <th scope="col" class="d-none d-sm-table-cell">Ubicaci&oacute;n</th>
          <th scope="col">Provincia</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inmueble in inmuebles" track-by="id">
          <td>{{getInmuebleType(inmueble.type)}}</td>
          <td class="d-none d-sm-table-cell">{{inmueble.street}}</td>
          <td>{{getInmuebleState(inmueble.state)}}</td>
          <td>
            <router-link :to="{ name: 'EditInmueble', params: { id: inmueble.id } }">
              <icon name="pencil"></icon>
              <span class="d-none d-sm-inline-block">Editar</span>
            </router-link>
          </td>
          <td>
            <a href="#" class="text-danger" v-on:click.prevent.stop="onDeleteDialog(inmueble.id)">
              <icon name="close"></icon>
              <span class="d-none d-sm-inline-block">Eliminar</span>
            </a>
          </td>
        </tr>
        <tr v-if="inmuebles.length == 0">
          <td colspan="5">No existen Inmuebles.</td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <router-link to="/agregar-inmueble" class="btn btn-info">
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
import { inmuebleTypes, provinces } from '../common'

export default {
  name: 'inmuebles-list',
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
      inmuebles: 'getInmuebles'
    })
  },
  methods: {
    ...mapActions([
      'deleteInmueble'
    ]),
    onDeleteDialog (inmuebleId) {
      this.$refs.deleteModal.open()
      this.toDelete = inmuebleId
    },
    confirmDeletion () {
      var _this = this
      this.deleteInmueble(this.toDelete)
        .then((response) => _this.notifySuccessDeletion())
      this.closeDialog()
    },
    closeDialog () {
      this.$refs.deleteModal.close()
    },
    getInmuebleType (inmuebleType) {
      return inmuebleTypes[inmuebleType]
    },
    getInmuebleState (inmuebleState) {
      return provinces[inmuebleState]
    }
  },
  created () {
    this.$store.dispatch('fetchInmuebles')
  },
  notifications: {
    notifySuccessDeletion: {
      type: VueNotifications.types.success,
      title: '',
      message: 'Inmueble eliminado'
    }
  }
}
</script>

<style scoped>
  a, a:hover { text-decoration: none; }
</style>
