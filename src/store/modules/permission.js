import { asyncRouter, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [...constantRoutes]
  },
  mutations: {
    setRoutes(state, filterRouters) {
      state.routes = [...constantRoutes, ...filterRouters]
    },
    removeRoutes(state) {
      state.routes = [...constantRoutes]
    }
  },
  actions: {
    filterRoutes(context, menus) {
      const filterRouters = asyncRouter.filter(item => menus.includes(item.children[0].name))
      context.commit('setRoutes', filterRouters)
      return filterRouters
    }
  }
}
