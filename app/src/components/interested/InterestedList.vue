<template>
  <div>
    <h1>Clientes Interesados</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"><span class="d-none d-sm-table-cell">Tipo de </span>Inmueble</th>
          <th scope="col"><span class="d-none d-sm-table-cell">Tipo de  </span>Operaci&oacute;n</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="interestedItem in interested" track-by="id">
          <td>{{ getInmuebleType(interestedItem.type) }}</td>
          <td>{{ getInmuebleOperation(interestedItem.operation) }}</td>
          <td>
            <router-link :to="{ name: 'InterestedEdit', params: { id: interestedItem.id } }">
              <icon name="pencil"></icon>
              <span class="d-none d-sm-inline-block">Editar</span>
            </router-link>
          </td>
          <td>
            <a href="#" class="text-danger" v-on:click.prevent.stop="onDeleteDialog(interestedItem.id)">
              <icon name="close"></icon>
              <span class="d-none d-sm-inline-block">Eliminar</span>
            </a>
          </td>
        </tr>
        <tr v-if="interested.length == 0">
          <td colspan="4">No existen clientes interesados.</td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <router-link :to="{ name: 'InterestedAdd' }" class="btn btn-info">
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
import { inmuebleTypes, operations } from '../../common'

export default {
  name: 'interested-list',
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
      interested: 'getInterested'
    })
  },
  methods: {
    ...mapActions([
      'deleteInterested'
    ]),
    onDeleteDialog (interestedId) {
      this.$refs.deleteModal.open()
      this.toDelete = interestedId
    },
    confirmDeletion () {
      var _this = this
      this.deleteInterested(this.toDelete)
        .then((response) => _this.notifySuccessDeletion())
      this.closeDialog()
    },
    closeDialog () {
      this.$refs.deleteModal.close()
    },
    getInmuebleType (interestedType) {
      return inmuebleTypes[interestedType]
    },
    getInmuebleOperation (interestedState) {
      return operations[interestedState]
    }
  },
  created () {
    this.$store.dispatch('fetchMyInterested')
  },
  notifications: {
    notifySuccessDeletion: {
      type: VueNotifications.types.success,
      title: '',
      message: 'Cliente interesado eliminado'
    }
  }
}
</script>
