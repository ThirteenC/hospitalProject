import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'

import Layout from '@/layout/index.vue'

// 配置路由信息
export const constantRoutes = [
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: {
      title: 'Redirect',
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: 'Redirect',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
      title: '404'
    }
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      hidden: true,
      title: '500'
    }
  }
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'homePage',
    component: Layout,
    redirect: '/homePage',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/index.vue'),
        meta: {
          title: '主页',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'tablePage',
        name: 'tablePage',
        component: () => import('@/views/tablePage/index.vue'),
        meta: {
          title: '表格页',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'medicationEducation',
        name: 'medicationEducation',
        component: () => import('@/views/medicationEducation/index.vue'),
        meta: {
          title: '药品教育',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    name: 'Redirect404',
    meta: {
      title: '404',
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory('./'),
  routes: constantRoutes.concat(asyncRoutes),
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
