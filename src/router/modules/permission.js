import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
