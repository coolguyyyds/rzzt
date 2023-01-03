import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index.vue'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
