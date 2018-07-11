<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream"/>
    <canvas class="d-none" ref="canvas" width="320" height="240" />
    <div class="camera-modal-container">
      <span @click="capture" class="take-picture-button">
        <icon name="camera" class="align-middle" scale="2"></icon>
      </span>
      <span class="d-block text-center mt-1">
        <a href="#" class="btn btn-link" @click.prevent="cancel">Cancelar</a>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import { cloudinaryConfig } from '@/common'

export default {
  name: 'camera',
  props: ['item'],
  data () {
    return {
      cloudinary: cloudinaryConfig,
      mediaStream: null
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(error => console.error('getUserMedia() error:', error))
  },
  destroyed () {
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
  },
  methods: {
    capture () {
      var _this = this
      var canvas = this.$refs.canvas
      canvas.getContext('2d')
        .drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height)
      var img = canvas.toDataURL('image/png')
      let loader = this.$loading.show()
      const formData = new FormData()
      formData.append('file', img)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      // formData.append('tags', 'tag1,tag2')
      let authHeader = Vue.http.headers.common['Authorization']
      delete Vue.http.headers.common['Authorization']
      Vue.http.post(this.cloudinary.uploadUrl, formData)
        .then((res) => {
          this.$emit('taken', res.data.public_id)
          loader.hide()
        })
        .catch((err) => {
          console.log(err)
          _this.notifyErrorUploading()
          loader.hide()
        })
      Vue.http.headers.common['Authorization'] = authHeader
    },
    cancel () {
      this.$emit('cancelled')
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

<style scoped>
  video {
    vertical-align: middle;
  }
  .camera-modal {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 10;
  }
  .camera-stream {
    width: 100%;
    max-height: 100%;
  }
  .camera-modal-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
  }
  .take-picture-button {
    display: flex;
    cursor: pointer;
    background: rgb(255,82,82);
    color: rgb(255,255,255);
    border-radius: 50%;
    font-size: 24px;
    height: 56px;
    margin: auto;
    min-width: 56px;
    width: 56px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
    position: relative;
    line-height: normal;
  }
  .take-picture-button .fa-icon {
    position: absolute;
    top: 45%;
    left: 50%;
    -webkit-transform: translate(-12px,-12px);
    transform: translate(-12px,-12px);
    line-height: 24px;
    width: 24px;
  }
</style>
