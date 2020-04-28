
const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/chat',
    component: () => import('layouts/ChatLayout.vue'),
    children: [
      { path: 'create', component: () => import('pages/CreateChat.vue') },
      { path: 'connect', component: () => import('pages/ConnectToChat.vue') }
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
