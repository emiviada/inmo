import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UsersList from '@/components/UsersList'
import InmueblesList from '@/components/InmueblesList'
import AddInmueble from '@/components/AddInmueble'
import EditInmueble from '@/components/EditInmueble'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/usuarios',
      name: 'UsersList',
      component: UsersList
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
