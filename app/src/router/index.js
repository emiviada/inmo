import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UsersList from '@/components/users/UsersList'
import AddUser from '@/components/users/AddUser'
import EditUser from '@/components/users/EditUser'
import InmueblesList from '@/components/inmuebles/InmueblesList'
import AddInmueble from '@/components/inmuebles/AddInmueble'
import EditInmueble from '@/components/inmuebles/EditInmueble'
import InmuebleDetail from '@/components/inmuebles/InmuebleDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detalle/:id',
      name: 'InmuebleDetail',
      component: InmuebleDetail
    },
    {
      path: '/usuarios',
      name: 'UsersList',
      component: UsersList
    },
    {
      path: '/agregar-usuario',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/editar-usuario/:id',
      name: 'EditUser',
      component: EditUser
    },
    {
      path: '/inmuebles',
      name: 'InmueblesList',
      component: InmueblesList
    },
    {
      path: '/agregar-inmueble',
      name: 'AddInmueble',
      component: AddInmueble
    },
    {
      path: '/editar-inmueble/:id',
      name: 'EditInmueble',
      component: EditInmueble
    }
  ]
})
