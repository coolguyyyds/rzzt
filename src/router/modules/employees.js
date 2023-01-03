import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
