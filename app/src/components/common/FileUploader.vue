<template>
  <div>
    <input type="file" class="form-cotrol d-none" name="file1" id="file1"
      @change="onFileSelected"
      ref="fileInput" accept="image/*">
    <button type="button" class="btn btn-link btn-sm" @click="$refs.fileInput.click()">Subir foto</button>
    <span v-if="userMediaSupported">|
      <button type="button" class="btn btn-link btn-sm" @click="enableCamera">Tomar foto</button>
    </span>

    <camera v-if="cameraOn" v-on:cancelled="onCancelled" v-on:taken="onTaken" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import { cloudinaryConfig } from '@/common'
import Camera from '@/components/common/Camera'

export default {
  name: 'file-uploader',
  props: ['item'],
  components: {
    Camera
  },
  data () {
    return {
      cloudinary: cloudinaryConfig,
      selectedFile: null,
      cameraOn: false
    }
  },
  computed: {
    userMediaSupported () {
      return 'mediaDevices' in navigator
    }
  },
  methods: {
    onFileSelected (event) {
      var _this = this
      let loader = this.$loading.show()
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      // formData.append('tags', 'tag1,tag2')
      Vue.http.post(this.cloudinary.uploadUrl, formData)
        .then((res) => {
          this.$emit('uploaded', this.item, res.data.public_id)
          loader.hide()
        })
        .catch((err) => {
          console.log(err)
          _this.notifyErrorUploading()
          loader.hide()
        })
    },
    enableCamera () {
      this.cameraOn = true
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    },
    scrollTo () {
      var _this = this
      document.body.style.overflow = 'inherit'
      setTimeout(function () {
        var element = document.getElementById(_this.item.replace('Pic', ''))
        element.scrollIntoView({behavior: 'smooth'})
      }, 300)
    },
    onCancelled () {
      this.cameraOn = false
      this.scrollTo()
    },
    onTaken (value) {
      this.$emit('uploaded', this.item, value)
      this.scrollTo()
    }
  },
  notifications: {
    notifyErrorUploading: {
      type: VueNotifications.types.error,
      title: 'Error',
      message: 'Hubo un error. Intentalo más tarde.'
    }
  }
}
</script>
