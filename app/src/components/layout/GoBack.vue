<template>
  <div v-if="showGoBack" class="go-back">
    <a @click.prevent="goBack"><icon name="arrow-left" class="align-middle"></icon></a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'go-back',
  computed: mapGetters(['showGoBack']),
  methods: {
    ...mapActions([
      'hideGoBack'
    ]),
    goBack () {
      this.$router.go(-1)
      this.hideGoBack()
    }
  }
}
</script>

<style scoped>
.go-back {
  background-color: #80cbc4;
  padding: 5px 10px;
}
.go-back a { color: white; cursor: pointer; }
</style>
