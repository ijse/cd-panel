import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Router from 'vue-router'
import routes from './routes'

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

Vue.use({
  install (Vue) {
    Vue.prototype.$getSetting = async () => {
      const resp = await axios.get('/setting')
      return resp.data
    }
  }
})

window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
