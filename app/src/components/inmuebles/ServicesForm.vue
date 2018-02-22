<template>
  <form class="col-lg-8">

    <div class="form-row">
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">Agua corriente</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2" value="option2">
        <label class="form-check-label" for="inlineRadio2">Energ&iacute;a El&eacute;ctrica</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">Agua corriente</label>
      </div>
      <div class="form-check col-6 col-md-4">
        <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="inlineRadio2" value="option2">
        <label class="form-check-label" for="inlineRadio2">Energ&iacute;a El&eacute;ctrica</label>
      </div>
    </div>

    <hr/>

    <div class="text-right">
      <router-link to="/inmuebles" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="submitting" class="btn btn-success">Guardar</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'services-form',
    props: ['inmueble'],
    data () {
      return {
        submitting: false
      }
    },
    methods: {
      /* validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('submit', this.inmueble)
          }
        })
      }, */
      onSubmit () {
        /* this.submitting = true
        this.validateBeforeSubmit()
        var _this = this
        setTimeout(function () { _this.submitting = false }, 2000) */
        console.log('onSubmit')
      }
    }
  }
</script>

<style scoped>
  .form-check-input { margin-left: 0; }
  .form-check-label { font-size: 0.85rem; }
</style>
