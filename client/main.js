import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
import VueSocketIo from 'vue-socket.io'

Vue.use(VueSocketIo, '/')
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})

Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios
  }
})

window.app = new Vue({
  el: '#app',
  sockets: {
    connect () {
      console.log('socket.io connected')
    }
  },
  router,
  render: h => h(App)
})
