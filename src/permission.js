import router, { asyncRouter, constantRoutes } from '@/router'
import store from '@/store'
router.beforeEach(async(to, from, next) => {
  // 第一种写法
  // if (!['/login', '/404', '/learn'].includes(to.path) && !store.state.user.token) {
  //   return next('/login')
  // }
  // next()
  // 第二种
  // if (['/login', '/404', '/learn'].includes(to.path) || store.state.user.token) {
  //   return next()
  // }
  // next('/login')
  // 白名单直接访问 第三种写法
  if (['/login', '/404', '/learn'].includes(to.path)) {
    return next()
  }
  if (store.state.user.token) {
    if (!store.state.user.userInfo.userId) {
      // const { roles: { menus }} = await store.dispatch('user/getUserInfo')
      // // console.log(menus)
      // // 对动态路由进行过滤 并且通过addRoutes添加动态路由
      // const filterRouters = asyncRouter.filter(item => menus.includes(item.children[0].name))
      // // 1.通过addRoutes方法添加路由配置,不会影响路由最开始原始始置router.options.routes
      // // 2.通过addRoutes方法添加路由配置,不会立即生效,需要下次跳转才生效
      // router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
      // // 解决菜单显示不出来
      // // push会导致不停的添加, 特别是退出登录
      // // router.options.routes.push(...filterRouters)
      // // 数组合并防止使用push操作不停添加
      // router.options.routes = [...constantRoutes, ...filterRouters]
      // // 重新跳转要去的页面
      // return next(to.path)

      // 标准写法
      const { roles: { menus }} = await store.dispatch('user/getUserInfo')
      const filterRouters = await store.dispatch('permission/filterRoutes', menus)
      router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
      router.options.routes = [...constantRoutes, ...filterRouters]
      return next(to.path)
    }
    next()
  } else {
    next('/login')
  }
})
