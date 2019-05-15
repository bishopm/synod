
const routes = [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      { name: 'addcontent', path: '/addcontent', component: () => import('components/Addcontent') },
      { name: 'about', path: '/about', component: () => import('components/About') },
      { name: 'bluebook', path: '/bluebook', component: () => import('components/Bluebook') },
      { name: 'circuit', path: '/circuits/:id', component: () => import('components/Circuit') },
      { name: 'circuits', path: '/circuits', component: () => import('components/Circuits') },
      { name: 'diary', path: '/diary', component: () => import('components/Diary') },
      { name: 'directory', path: '/directory', component: () => import('components/Directory') },
      { name: 'document', path: '/document/:src', component: () => import('components/Document') },
      { name: 'help', path: '/help', component: () => import('components/Help') },
      { name: 'home', path: '/', component: () => import('components/Home') },
      { name: 'hymnbook', path: '/hymnbook', component: () => import('components/Hymnbook') },
      { name: 'hymn', path: '/hymnbook/:id', component: () => import('components/Hymn') },
      { name: 'journey', path: '/journey', component: () => import('components/Journey') },
      { name: 'phoneverification', path: '/phoneverification', component: () => import('components/Phoneverification') },
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
