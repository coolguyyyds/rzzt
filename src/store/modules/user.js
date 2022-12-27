import { getEmployeeBaseInfo, getUserBaseInfo, login } from '@/api/user'
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
  },
  async getUserInfo(context) {
    const o = await getUserBaseInfo()
    const m = await getEmployeeBaseInfo(o.userId)
    context.commit('SET_USERINFO', { ...o, ...m })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

