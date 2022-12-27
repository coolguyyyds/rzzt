import request from '@/utils/request'
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
