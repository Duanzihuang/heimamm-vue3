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
          ),
        meta: {
          title: '欢迎页面', // 左侧的标题
          icon: 'el-icon-goods', // 图标
          path: '/layout/welcome', // 访问的路径
          roles: ['超级管理员', '管理员', '老师', '学生'] // 哪些角色可以访问
        }
      },
      {
        path: 'chart',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/chart/index.vue'
          ),
        meta: {
          title: '数据预览', // 左侧的标题
          icon: 'el-icon-pie-chart', // 图标
          path: '/layout/chart', // 访问的路径
          roles: ['超级管理员', '管理员', '老师'] // 哪些角色可以访问
        }
      },
      {
        path: 'user',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/user/index.vue'
          ),
        meta: {
          title: '用户列表',
          icon: 'el-icon-user', // 图标
          path: '/layout/user', // 访问的路径
          roles: ['超级管理员', '管理员', '老师'] // 哪些角色可以访问
        }
      },
      {
        path: 'enterprise',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/enterprise/index.vue'
          ),
        meta: {
          title: '企业列表',
          icon: 'el-icon-office-building', // 图标
          path: '/layout/enterprise', // 访问的路径
          roles: ['超级管理员', '管理员', '老师'] // 哪些角色可以访问
        }
      },
      {
        path: 'subject',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/subject/index.vue'
          ),
        meta: {
          title: '学科列表',
          icon: 'el-icon-notebook-2', // 图标
          path: '/layout/subject', // 访问的路径
          roles: ['超级管理员', '管理员', '老师'] // 哪些角色可以访问
        }
      },
      {
        path: 'question',
        component: () =>
          import(
            /* webpackChunkName: "layout" */ '../views/layout/question/index.vue'
          ),
        meta: {
          title: '题库列表',
          icon: 'el-icon-edit-outline', // 图标
          path: '/layout/question', // 访问的路径
          roles: ['超级管理员', '管理员', '老师', '学生'] // 哪些角色可以访问
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
