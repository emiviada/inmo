<template>
  <nav id="menu">
    <div class="title" v-on:click="closeMenu">
      <router-link to="/">Inmo Web</router-link>
    </div>
    <ul>
      <li v-on:click="closeMenu" v-if="isAdmin">
        <router-link :to="{ name: 'UsersList' }">
          <icon name="users" class="align-middle"></icon>&nbsp;
          <span class="align-middle">Usuarios</span>
        </router-link>
      </li>
      <li v-on:click="closeMenu" v-if="isAdmin || isInmo">
        <router-link :to="{ name: 'InmueblesList' }">
          <icon name="building" class="align-middle"></icon>&nbsp;
          <span class="align-middle">Inmuebles</span>
        </router-link>
      </li>
      <li v-on:click="closeMenu" v-if="isAdmin || isInmo">
        <router-link :to="{ name: 'InterestedList' }">
          <icon name="users" class="align-middle"></icon>&nbsp;
          <span class="align-middle">Interesados</span>
        </router-link>
      </li>
      <li v-on:click="closeMenu" v-if="isAdmin || isInmo">
        <router-link :to="{ name: 'MyProfile' }">
          <icon name="user" class="align-middle"></icon>&nbsp;
          <span class="align-middle">Mi Perfil</span>
        </router-link>
      </li>
    </ul>

    <ul class="logout">
      <li v-on:click="closeMenu">
        <a href="#" @click.prevent="signOut">
          <icon name="sign-out" class="align-middle"></icon>&nbsp;
          <span class="align-middle">Cerrar Sesi&oacute;n</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'sidebar-menu',
  computed: {
    isAdmin () {
      return this.$store.state.security.user.role === 'admin'
    },
    isInmo () {
      return this.$store.state.security.user.role === 'inmo'
    }
  },
  methods: {
    closeMenu: function () {
      this.$parent.slideout.toggle()
    },
    signOut () {
      this.$store.dispatch('signOut')
        .then(response => this.$router.push({name: 'Login'}))
    }
  }
}
</script>

<style>
#menu { padding-top: 20px; font-size: 0.9rem; }
#menu .title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 19px;
}
#menu .title a,
#menu .title a:hover,
#menu .title a:focus,
#menu .title a:active { color: inherit; text-decoration: none; }
#menu ul {
  list-style-type: none;
  padding-left: 0;
}
#menu ul li {
  border-bottom: 1px solid #eee;
  padding: 10px 10px 10px 20px;
}
#menu ul li:first-child {
  border-top: 1px solid #eee;
}
#menu ul li:hover { opacity: .75; }
#menu ul li a {
  color: white;
  text-decoration: none;
  display: block;
}
#menu ul li a.router-link-exact-active { opacity: 0.5; }
#menu .logout { margin-top: 100px; }
</style>
