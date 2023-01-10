import request from '@/utils/request'
// 根据id查询企业
export function getCompanyInfo(id) {
  return request({
    url: '/company/' + id,
    method: 'GET'
  })
}
// 获取所有角色列表
// 通过http协议传数据
// (1)通过请求体例如post提交传json
// (2)通过请求的地址url,通过查询字符串,/sys/role?page=1&
// url: '/sys/role?page=' + params.page + '&pagesize=' + params.pagesize,
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 根据ID删除角色
export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}
// 根据ID更新角色
export function editRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'PUT',
    data
  })
}
// 根据ID获取角色详情
export function getRoleById(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'GET'
  })
}
// 给角色分配权限
export function assignRolePrem(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
