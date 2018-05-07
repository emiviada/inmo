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

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
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
      beforeEnter: ifAuthenticated
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
      beforeEnter: ifAuthenticated
    },
    {
      path: '/usuarios',
      name: 'UsersList',
      component: UsersList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/agregar-usuario',
      name: 'AddUser',
      component: AddUser,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/editar-usuario/:id',
      name: 'EditUser',
      component: EditUser,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inmuebles',
      name: 'InmueblesList',
      component: InmueblesList,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/agregar-inmueble',
      name: 'AddInmueble',
      component: AddInmueble,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/editar-inmueble/:id',
      name: 'EditInmueble',
      component: EditInmueble,
      beforeEnter: ifAuthenticated
    }
  ]
})
