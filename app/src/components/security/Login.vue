<template>
  <div class="login bg-white rounded px-3 py-3 mx-auto mt-5">
    <h1 class="text-center">Inmo Web</h1>
    <form @submit.prevent="onSubmit" class="mt-3">
      <div class="form-group">
        <label for="email">Direcci&oacute;n de E-mail</label>
        <input type="email" :class="{'form-control': true, 'is-danger': errors.has('email') }" id="email" name="email" v-model="email" aria-describedby="emailHelp" placeholder="Ingresa tu email" v-validate="'required|email'">
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
      </div>
      <div class="form-group">
        <label for="password">Contrase&ntilde;a</label>
        <input type="password" :class="{'form-control': true, 'is-danger': errors.has('password') }" v-model="password" id="password" name="password" placeholder="Contraseña" v-validate="'required|min:6'" @focus="pwdOnFocus">
        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
      </div>
      <div class="form-group text-right">
        <button type="submit" :disabled="errors.any() || submitting" class="btn btn-info">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      submitting: false,
      loader: null
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          const { email, password } = this
          this.$store.dispatch('signIn', { email, password })
            .then(response => {
              if (response && response.status !== 200) {
                let errorMsg = 'Credenciales incorrectas.'
                this.$validator.errors.add('password', errorMsg)
              } else {
                this.$router.push({name: 'Home'})
              }
            }).finally(() => {
              this.loader.hide()
              this.submitting = false
            })
        }
      })
    },
    onSubmit () {
      this.loader = this.$loading.show()
      this.submitting = true
      this.validateBeforeSubmit()
    },
    pwdOnFocus () {
      this.$validator.errors.clear()
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
}
</style>