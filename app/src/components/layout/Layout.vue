<template>
  <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.navbar-toggler']"
    @on-beforeopen="showOverlay" @on-beforeclose="hideOverlay">

    <sidebar-menu/>

    <main id="panel">

      <top-menu/>
      <go-back />

      <div class="container main-content">
        <router-view/>
        <div class="overlay" ref="overlay" style="display: none;"></div>
      </div>

      <layout-footer/>

    </main>
  </Slideout>
</template>

<script>
import Slideout from 'vue-slideout'
import SidebarMenu from '@/components/SidebarMenu'
import TopMenu from '@/components/TopMenu'
import GoBack from '@/components/layout/GoBack'
import LayoutFooter from '@/components/layout/LayoutFooter'

export default {
  name: 'layout',
  components: {
    Slideout,
    SidebarMenu,
    TopMenu,
    GoBack,
    LayoutFooter
  },
  methods: {
    showOverlay: function () {
      this.overlay.style.display = 'block'
    },
    hideOverlay: function () {
      this.overlay.style.display = 'none'
    }
  },
  mounted () {
    this.overlay = this.$refs.overlay
  }
}
</script>
