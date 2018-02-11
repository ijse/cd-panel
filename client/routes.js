import Page404 from './404'
import Dashboard from './Dashboard'
import MRList from './MRList'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/mr', component: MRList },

  { path: '/404', component: Page404 },
  { path: '/*', redirect: '/404' }
]

export default routes
