import Page404 from './404'
import Dashboard from './Dashboard'
import MRList from './MRList'
import Setting from './Setting'

const routes = [
  { name: 'Dashboard',
    path: '/', component: Dashboard },
  { name: 'MR',
    path: '/mr', component: MRList },
  { name: 'Setting',
    path: '/setting', component: Setting },

  { name: '404',
    path: '/404', component: Page404 },
  { path: '/*', redirect: '/404' }
]

export default routes
