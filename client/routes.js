import Page404 from './404'
import Dashboard from './Dashboard'
import Board from './Board'
import Queue from './Queue'
import Journal from './Journal'
import Setting from './Setting'
import Monitor from './Monitor'
import Login from './Login'

const routes = [
  { name: 'Dashboard',
    path: '/', component: Dashboard },
  { name: 'Login',
    path: '/login', component: Login },
  { name: 'Board',
    path: '/board', component: Board },
  { name: 'Queue',
    path: '/queue', component: Queue },
  { name: 'Journal',
    path: '/journal', component: Journal },
  { name: 'Setting',
    path: '/setting', component: Setting },
  { name: 'Monitor',
    path: '/monitor', component: Monitor },

  { name: '404',
    path: '/404', component: Page404 },
  { path: '/*', redirect: '/404' }
]

export default routes
