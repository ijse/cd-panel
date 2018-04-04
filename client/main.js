import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'
import VueSocketIo from 'vue-socket.io'
import moment from 'moment'
import Notification from 'vue-native-notification'
import Cookies from 'js-cookie'

Vue.use(VueSocketIo, '/')
Vue.use(Router)
const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') return next()
  if (!Cookies.get('user')) {
    next('/login')
  } else {
    next()
  }
})

// set page title
router.afterEach(to => {
  document.title = to.name + ' | cd-panel'
})

Vue.use({
  install (Vue) {
    axios.interceptors.response.use(resp => {
      return resp
    }, err => {
      const response = err.response
      if (response.url === '/login') {
        return
      }
      if (response.status === 401) {
        router.push('/login')
      }
    })
    Vue.prototype.$http = axios
    Vue.filter('timeToNow', dateStr => {
      return moment(dateStr).fromNow()
    })
  }
})

// notification
Vue.use(Notification, {
  requestOnNotify: true
})
Vue.notification.requestPermission()

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
