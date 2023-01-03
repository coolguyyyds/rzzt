// import Vue from 'vue'
import dayjs from 'dayjs'
import EmployeesNum from '@/api/constant/employees'

// Vue.filter('formatDate', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

// 该写法提供单纯的方法 vue和js都能使用
export function formatDate(val) {
  return val ? dayjs(val).format('YYYY-MM-DD') : ''
}
export function formOfEmployment(val) {
  const f = EmployeesNum.hireType.find(item => item.id === val)
  return f ? f.value : '未知'
}
