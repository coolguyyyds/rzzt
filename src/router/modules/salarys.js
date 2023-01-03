import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys/index.vue'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
