import Page404 from './404'
import Dashboard from './Dashboard'
import Board from './Board'
import Queue from './Queue'
import Setting from './Setting'
import Monitor from './Monitor'

const routes = [
  { name: 'Dashboard',
    path: '/', component: Dashboard },
  { name: 'Board',
    path: '/board', component: Board },
  { name: 'Queue',
    path: '/queue', component: Queue },
  { name: 'Setting',
    path: '/setting', component: Setting },
  { name: 'Monitor',
    path: '/monitor', component: Monitor },

  { name: '404',
    path: '/404', component: Page404 },
  { path: '/*', redirect: '/404' }
]

export default routes
