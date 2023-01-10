import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'settings',
      component: () => import('@/views/setting/index.vue'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
