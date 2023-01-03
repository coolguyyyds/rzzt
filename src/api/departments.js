import request from '@/utils/request'
// 查询企业的部门列表
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 根据ID删除部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 根据ID查询部门详情
export function getDepartmentsById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 根据ID修改部门详情
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
