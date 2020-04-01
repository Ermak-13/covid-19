import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  formatNumber,
  formatDelta,
  formatDate
} from '@/utils.js'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    formatNumber,
    formatDelta,
    formatDate
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
