
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { name: 'about', path: '/about', component: () => import('components/About') },
      { name: 'circuit', path: '/circuits/:id', component: () => import('components/Circuit') },
      { name: 'circuits', path: '/circuits', component: () => import('components/Circuits') },
      { name: 'diary', path: '/diary', component: () => import('components/Diary') },
      { name: 'directory', path: '/directory', component: () => import('components/Directory') },
      { name: 'document', path: '/document/:src', component: () => import('components/Document') },
      { name: 'home', path: '/', component: () => import('components/Home') },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification') },
      { name: 'settings', path: '/settings', component: () => import('components/Settings') },
      { name: 'society', path: '/societies/:id', component: () => import('components/Society') },
      { name: 'synod', path: '/synods/:year', component: () => import('components/Synod') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
