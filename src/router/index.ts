import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../views/layout/index.vue'),
    children: [
      {
        path: 'welcome',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/welcome/index.vue'
          )
      },
      {
        path: 'chart',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/chart/index.vue'
          )
      },
      {
        path: 'user',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/user/index.vue'
          )
      },
      {
        path: 'enterprise',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/enterprise/index.vue'
          )
      },
      {
        path: 'subject',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/subject/index.vue'
          )
      },
      {
        path: 'question',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/question/index.vue'
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
