<template>
  <div>
    <input type="file" class="form-cotrol d-none" name="file1" id="file1"
      @change="onFileSelected"
      ref="fileInput" accept="image/*">
    <button type="button" class="btn btn-link btn-sm" @click="$refs.fileInput.click()">Subir foto</button> |
    <button type="button" class="btn btn-link btn-sm">Tomar foto</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'file-uploader',
  props: ['item'],
  data () {
    return {
      cloudinary: {
        uploadPreset: 'uko8lel4',
        apiKey: '712943953164839',
        cloudName: 'dq2ghwy1m'
      },
      selectedFile: null
    }
  },
  computed: {
    clUrl () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    }
  },
  methods: {
    onFileSelected (event) {
      let loader = this.$loading.show()
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      // formData.append('tags', 'tag1,tag2')
      Vue.http.post(this.clUrl, formData)
        .then((res) => {
          this.$emit('uploaded', this.item, res.data.public_id)
          loader.hide()
        })
    }
  }
}
</script>
