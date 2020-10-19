import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)
// 路由守卫
 function checkedEnter(path, next) {
  let menus_url = store.state.userInfo.menus_url;
  if (menus_url.includes(path)) {
    next()
    return
  } else {
    next('/')
  }
  next()
} 

//首页下二级路由
export let indexRoutes = [{
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
    name: '菜单管理',
    beforeEnter(to,from,next){
      checkedEnter('/menu',next)
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role.vue"),
    name: '角色管理',
    beforeEnter(to,from,next){
      checkedEnter('/role',next)
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage.vue"),
    name: '管理员管理',
    beforeEnter(to,from,next){
      checkedEnter('/manage',next)
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate.vue"),
    name: '商品分类',
    beforeEnter(to,from,next){
      checkedEnter('/cate',next)
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs.vue"),
    name: '商品规格',
    beforeEnter(to,from,next){
      checkedEnter('/specs',next)
    }
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods.vue"),
    name: '商品管理',
    beforeEnter(to,from,next){
      checkedEnter('/goods',next)
    }
  },
  {
    path: "member",
    component: () => import("../pages/member/member.vue"),
    name: '会员管理',
    beforeEnter(to,from,next){
      checkedEnter('/member',next)
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner.vue"),
    name: '轮播图管理',
    beforeEnter(to,from,next){
      checkedEnter('/banner',next)
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue"),
    name: '秒杀活动',
    beforeEnter(to,from,next){
      checkedEnter('/seckill',next)
    }
  },
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [{
          path: '',
          component: () => import('../pages/home/home.vue')
        },
        ...indexRoutes
      ]
    }
  ]
})
// 登录拦截
 router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }
  // 如果不是前往登录页，查看是否登录，登录了就是next，没有就前往登录
  if (store.state.userInfo.token) {
    next();
    return;
  }
  next('/login')
})
export default router
