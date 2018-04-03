<template>
  <form class="col-lg-8">

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="userFirstName">Nombre</label>
        <input type="text" class="form-control" v-model="user.first_name" id="userFirstName" >
      </div>
      <div class="form-group col-md-6">
        <label for="userLastName">Apellido</label>
        <input type="text" class="form-control" v-model="user.last_name" id="userLastName" ></textarea>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="userEmail">E-mail</label>
        <input type="email" v-validate="'required|email'" :class="{'form-control': true, 'is-danger': errors.has('userEmail') }" v-model="user.email" id="userEmail" name="userEmail" />
        <span v-show="errors.has('userEmail')" class="help is-danger">{{ errors.first('userEmail') }}</span>
      </div>
      <div class="form-group col-md-6">
        <label for="userRole">Rol</label>
        <select v-model="user.role" v-validate="'required'" :class="{'form-control': true, 'is-danger': errors.has('userRole') }" id="userRole" name="userRole">
          <option value="">---</option>
          <option v-for="(role, index) in roles" v-bind:value="index">{{ role }}</option>
        </select>
        <span v-show="errors.has('userRole')" class="help is-danger">{{ errors.first('userRole') }}</span>
      </div>
    </div>

    <div class="form-row" v-if="isEditMode">
      <hr/>
      <a href="#">Cambiar Contrase&ntilde;a</a>
    </div>

    <div class="form-row" v-if="!isEditMode">
      <div class="form-group col-md-6">
        <label for="userPassword">Contrase&ntilde;a</label>
        <input type="password" v-validate="'required|min:6'" :class="{'form-control': true, 'is-danger': errors.has('userPassword') }" v-model="user.password" id="userPassword" name="userPassword" />
        <span v-show="errors.has('userPassword')" class="help is-danger">{{ errors.first('userPassword') }}</span>
      </div>
      <div class="form-group col-md-6">
        <label for="userConfirmPassword">Confirmar Contrase&ntilde;a</label>
        <input type="password" v-validate="'required|confirmed:userPassword'" :class="{'form-control': true, 'is-danger': errors.has('userConfirmPassword') }" v-model="user.confirm_password" id="userConfirmPassword" name="userConfirmPassword" />
        <span v-show="errors.has('userConfirmPassword')" class="help is-danger">{{ errors.first('userConfirmPassword') }}</span>
      </div>
    </div>

    <hr/>

    <div class="text-right">
      <router-link to="/usuarios" class="btn btn-link">Cancelar</router-link> &nbsp;&nbsp;
      <button type="submit" v-on:click.prevent="onSubmit" :disabled="submitting" class="btn btn-success">Guardar</button>
    </div>
  </form>
</template>

<script>
import { userRoles } from '../../common'

export default {
  name: 'save-user-form',
  props: ['user', 'mode'],
  data () {
    return {
      submitting: false,
      roles: userRoles
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
          this.$emit('submit', this.user)
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
