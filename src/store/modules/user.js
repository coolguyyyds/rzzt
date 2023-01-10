import { getEmployeeBaseInfo, getUserBaseInfo, login } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN: (state) => {
    state.token = undefined
    removeToken()
  },
  SET_USERINFO(state, data) {
    state.userInfo = data
  },
  REMOVE_USERINFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, loginForm) {
    const token = await login(loginForm)
    context.commit('SET_TOKEN', token)
  },
  logout(context) {
    // this.$store 等效于 context
    context.commit('REMOVE_TOKEN')
    context.commit('REMOVE_USERINFO')
    // 重置路由 推出的时候重置路由 防止重复addRoutes路由配置
    resetRouter()
  },
  async getUserInfo(context) {
    const o = await getUserBaseInfo()
    const m = await getEmployeeBaseInfo(o.userId)
    const userInfo = { ...o, ...m }
    context.commit('SET_USERINFO', userInfo)
    return userInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

