import request from '@/utils/request'
// data: {}// json格式
// data: 'useranme=zs&age=20'// urlencoded
// 页面上,let formData = new FormData()
// formData.append('mobile', this.form.mobile)
// formData.append('ver_code', this.form.code)
// login(formData)
// data: formData
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户基本资料
export function getUserBaseInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取员工基本信息
export function getEmployeeBaseInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
export const getUserDetailById = getEmployeeBaseInfo
// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
