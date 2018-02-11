import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})

window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
