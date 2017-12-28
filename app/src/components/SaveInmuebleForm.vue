<template>
  <form class="col-lg-6">
    <div class="form-group">
      <label for="InmuebleType">Tipo de propiedad</label>
      <select v-model="inmueble.type" class="form-control" id="InmuebleType">
        <option value="Casa">Casa</option>
        <option value="Depto">Departamento</option>
        <option value="Baldio">Baldio</option>
      </select>
    </div>
    <div class="form-group">
      <label for="inmuebleLocation">Ubicación</label>
      <textarea class="form-control" v-model="inmueble.location" id="inmuebleLocation" rows="3" maxlength="128" placeholder="Ingresa la ubicaci&oacute;n del inmueble"></textarea>
    </div>
    <div class="form-group">
      <label for="price">Precio</label>
      <input type="number" v-model="inmueble.price" class="form-control" id="price" placeholder="Ingresa el precio" number>
    </div>
    <div class="text-right">
      <router-link to="/inmuebles" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-success">Guardar</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'save-inmueble-form',
  props: ['inmueble'],
  methods: {
    onSubmit () {
      this.$emit('submit', this.inmueble)
    }
  }
}
</script>
