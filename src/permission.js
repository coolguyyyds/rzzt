import router from '@/router'
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
      await store.dispatch('user/getUserInfo')
    }
    next()
  } else {
    next('/login')
  }
})
