import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';
import ByCountry from '../views/ByCountry.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/by-country',
    name: 'by-country',
    component: ByCountry
  }
]

const router = new VueRouter({
  routes
})

export default router
