import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UsersList from '@/components/UsersList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'UsersList',
      component: UsersList
    }
  ]
})
