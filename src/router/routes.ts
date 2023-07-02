//  常量路由

export const routerList = [
  {
    //登录页
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    }
  },
  {
    //主页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '主页',
      icon: 'HomeFilled',
      hidden: false,
    },
    redirect: '/home',
    itemFlag: true,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title:'主页',
          icon: 'HomeFilled',
          tBar:true,
        }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数字化BI',
      icon: 'TrendCharts',
      hidden: false,
    }
  },
  {
    path:"/acl",
    component: () => import('@/layout/index.vue'),
    name: 'acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    children: [
      {
        path:'/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'User',
          hidden: false,
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'Avatar',
          hidden: false,
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'permission',
        meta: {
          title: '权限管理',
          icon: 'Operation',
          hidden: false,
        }
      }
    ]

  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      icon: 'GoodsFilled',
      hidden: false,
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCart',
          hidden: false,
        }
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title:'属性管理',
          icon: 'Coin',
          hidden: false,
        }
      },
      {
        path: '/product/spu',
        name: 'spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'HelpFilled',
          hidden: false,
        }
      },
      {
        path: '/product/sku',
        name: 'sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'HelpFilled',
          hidden: false,
        }
      },
      
    ]

  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '任意路由匹配',
      hidden: true
    },
  },
  {
    //任意路由匹配
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由匹配',
      hidden: true
    },
  },
]
