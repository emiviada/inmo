<template>
  <form class="col-lg-8">

    <div class="form-group">
      <label for="interestedType">Tipo de propiedad</label>
      <select v-model="interested.type" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('interestedType') }" id="interestedType" name="interestedType">
        <option value="">---</option>
        <option v-for="(type, index) in types" v-bind:value="index">{{ type }}</option>
      </select>
      <span v-show="errors.has('interestedType')" class="help is-danger">{{ errors.first('interestedType') }}</span>
    </div>

    <div class="form-group">
      <label for="interestedOperation">Operaci&oacute;n</label>
      <select v-model="interested.operation" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('interestedOperation') }" id="interestedOperation" name="interestedOperation">
        <option value="">---</option>
        <option v-for="(operation, index) in operations" v-bind:value="index">{{ operation }}</option>
      </select>
      <span v-show="errors.has('interestedOperation')" class="help is-danger">{{ errors.first('interestedOperation') }}</span>
    </div>

    <div class="form-group">
      <label for="interestedInfo">Info Adicional</label>
      <textarea v-model="interested.info" class="form-control" name="interestedInfo"></textarea>
    </div>

    <hr/>

    <div class="text-right">
      <router-link :to="{ name: 'InterestedList' }" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="errors.any() || submitting" class="btn btn-success">Guardar</button>
    </div>

  </form>
</template>

<script>
import { inmuebleTypes, operations } from '../../common'

export default {
  name: 'save-interested-form',
  props: ['interested', 'mode'],
  data () {
    return {
      submitting: false,
      types: inmuebleTypes,
      operations: operations
    }
  },
  computed: {
    isEditMode () {
      return this.mode === 'edit'
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('submit', this.interested)
        }
      })
    },
    onSubmit () {
      this.submitting = true
      this.validateBeforeSubmit()
      var _this = this
      setTimeout(function () { _this.submitting = false }, 2000)
    }
  }
}
</script>
