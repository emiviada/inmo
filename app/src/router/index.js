import Vue from 'vue'
import Router from 'vue-router'

import store from '../vuex/store'
import Home from '@/components/Home'
import Login from '@/components/security/Login'
import UsersList from '@/components/users/UsersList'
import AddUser from '@/components/users/AddUser'
import EditUser from '@/components/users/EditUser'
import InmueblesList from '@/components/inmuebles/InmueblesList'
import AddInmueble from '@/components/inmuebles/AddInmueble'
import EditInmueble from '@/components/inmuebles/EditInmueble'
import InmuebleDetail from '@/components/inmuebles/InmuebleDetail'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}
const hasRightRole = (to, role) => {
  let has = false
  if (role === 'normal' && to.meta.normal) {
    has = true
  } else if (role === 'inmo' && to.meta.inmo) {
    has = true
  } else if (role === 'admin' && to.meta.admin) {
    has = true
  }

  return has
}
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    let role = store.state.security.user.role
    if (hasRightRole(to, role)) {
      next()
      return
    }
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated,
      meta: { normal: true, inmo: true, admin: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/detalle/:id',
      name: 'InmuebleDetail',
      component: InmuebleDetail,
      beforeEnter: ifAuthenticated,
      meta: { normal: true, inmo: true, admin: true }
    },
    {
      path: '/usuarios',
      name: 'UsersList',
      component: UsersList,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: false, admin: true }
    },
    {
      path: '/agregar-usuario',
      name: 'AddUser',
      component: AddUser,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: false, admin: true }
    },
    {
      path: '/editar-usuario/:id',
      name: 'EditUser',
      component: EditUser,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: false, admin: true }
    },
    {
      path: '/inmuebles',
      name: 'InmueblesList',
      component: InmueblesList,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: true, admin: true }
    },
    {
      path: '/agregar-inmueble',
      name: 'AddInmueble',
      component: AddInmueble,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: true, admin: true }
    },
    {
      path: '/editar-inmueble/:id',
      name: 'EditInmueble',
      component: EditInmueble,
      beforeEnter: ifAuthenticated,
      meta: { normal: false, inmo: true, admin: true }
    }
  ]
})
