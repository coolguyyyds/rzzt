import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'departments',
      component: () => import('@/views/departments/index.vue'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
