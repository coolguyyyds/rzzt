import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const request = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net/api'
  baseURL: '/api'
})
// 添加请求拦截器
request.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // 统一做数据解构处理,简化页面代码
  const { data: { data, success, message }} = response
  // 统一处理响应数据返回，对状态码为200的错误进行处理
  if (!success) {
    Message.error(message)
    // 主动产生错误
    // throw new Error(message)
    return Promise.reject(new Error(message))
  }
  return data
}, function(error) {
  // 对响应错误做点什么
  // 是严重错误,状态码的报错,例如401,token失效,500,后端服务器出故障
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default request
