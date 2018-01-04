<template>
  <div>
    <h1>Inmuebles</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Tipo de Inmueble</th>
          <th scope="col" class="d-none d-sm-block">Descripci&oacute;n</th>
          <th scope="col">Precio</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inmueble in inmuebles" track-by="id">
          <td>{{inmueble.type}}</td>
          <td class="d-none d-sm-block">{{inmueble.location}}</td>
          <td>{{inmueble.price}}:-</td>
          <td>
            <router-link :to="{ name: 'EditInmueble', params: { id: inmueble.id } }">
              <icon name="pencil"></icon>
              <span class="d-none d-sm-inline-block">Editar</span>
            </router-link>
          </td>
          <td>
            <a href="#" class="text-danger" v-on:click.prevent.stop="onRemove(inmueble.id)">
              <icon name="close"></icon>
              <span class="d-none d-sm-inline-block">Eliminar</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <router-link to="/agregar-inmueble" class="btn btn-info">
        <icon name="plus" class="pt-1"></icon>
        Agregar
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'inmuebles-list',
  computed: mapGetters({
    inmuebles: 'getInmuebles'
  }),
  methods: {
    ...mapActions([
      'deleteInmueble'
    ]),
    onRemove (inmuebleId) {
      this.deleteInmueble(inmuebleId)
    }
  }
}
</script>

<style scoped>
  a, a:hover { text-decoration: none; }
</style>
