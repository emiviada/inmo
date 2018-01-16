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
          <td>{{inmueble.type}}</td>
          <td class="d-none d-sm-table-cell">{{inmueble.street}}</td>
          <td>{{inmueble.state}}:-</td>
          <td>
            <router-link :to="{ name: 'EditInmueble', params: { id: inmueble.id } }">
              <icon name="pencil"></icon>
              <span class="d-none d-sm-inline-block">Editar</span>
            </router-link>
          </td>
          <td>
            <a href="#" class="text-danger" v-on:click.prevent.stop="onRemoveDialog(inmueble.id)">
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
      ¿Est&aacute;s seguro?

      <div class="text-right">
        <button class="btn btn-primary" v-on:click="closeDialog()">Cancelar</button>
      </div>
    </sweet-modal>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SweetModal from 'sweet-modal-vue/src/components/SweetModal'

export default {
  name: 'inmuebles-list',
  components: {
    SweetModal
  },
  computed: mapGetters({
    inmuebles: 'getInmuebles'
  }),
  methods: {
    ...mapActions([
      'deleteInmueble'
    ]),
    onRemoveDialog () {
      this.$refs.deleteModal.open()
    },
    onRemove (inmuebleId) {
      this.deleteInmueble(inmuebleId)
    },
    closeDialog () {
      this.$refs.deleteModal.close()
    }
  },
  created () {
    this.$store.dispatch('fetchInmuebles')
  }
}
</script>

<style scoped>
  a, a:hover { text-decoration: none; }
</style>
