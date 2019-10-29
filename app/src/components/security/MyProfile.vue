<template>
  <div>
    <h1>Mi Perfil</h1>
    <div class="row">
      <form class="col-lg-8">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="address">Direcci&oacute;n</label>
            <input type="text" class="form-control" v-model="profile.address" id="address" />
          </div>
          <div class="form-group col-md-6">
            <label for="phone">Tel&eacute;fono</label>
            <input type="text" class="form-control" v-model="profile.phone" id="phone" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="web">Sitio Web</label>
            <input type="text" name="web" v-validate="'url:require_protocol'" class="form-control" v-model="profile.web" id="web" />
            <span v-show="errors.has('web')" class="help is-danger">{{ errors.first('web') }}</span>
          </div>
          <div class="form-group col-md-6">
            <label for="facebook">
              <icon name="facebook-square"></icon> Facebook
            </label>
            <input type="text" name="facebook" v-validate="'url:require_protocol'" class="form-control" v-model="profile.facebook" id="facebook" />
            <span v-show="errors.has('facebook')" class="help is-danger">{{ errors.first('facebook') }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="instagram">
              <icon name="instagram"></icon> Instagram
            </label>
            <input type="text" class="form-control" v-model="profile.instagram" id="instagram" />
          </div>
          <div class="form-group col-md-6">
            <label for="twitter">
              <icon name="twitter"></icon> Twitter
            </label>
            <input type="text" class="form-control" v-model="profile.twitter" id="twitter" />
          </div>
        </div>

        <hr/>

        <div class="text-right">
          <a href="#" class="btn btn-link" @click.prevent="goBack">Cancelar</a> &nbsp;&nbsp;
          <button type="submit" @click.prevent="onSubmit" :disabled="errors.any() || submitting" class="btn btn-success">Guardar</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueNotifications from 'vue-notifications'

export default {
  name: 'my-profile',
  data () {
    return {
      profile: {},
      submitting: false
    }
  },
  methods: {
    ...mapActions([
      'editProfile'
    ]),
    goBack () {
      this.$router.go(-1)
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.editProfile(this.profile)
          .then(() => {
            this.notifySuccessCreation()
          })
          .catch(() => this.notifyErrorCreation())
        }
      })
    },
    onSubmit () {
      this.submitting = true
      this.validateBeforeSubmit()
      setTimeout(() => { this.submitting = false }, 300)
    }
  },
  created () {
    this.$store.dispatch('getProfile')
  },
  mounted () {
    setTimeout(() => (this.profile = { ...this.$store.getters.getProfile }), 300)
  },
  notifications: {
    notifySuccessCreation: {
      type: VueNotifications.types.success,
      title: 'Ok!',
      message: 'Perfil editado con éxito'
    },
    notifyErrorCreation: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Intentalo más tarde.'
    }
  }
}
</script>
