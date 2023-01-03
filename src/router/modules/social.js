import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'social',
      component: () => import('@/views/social/index.vue'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
