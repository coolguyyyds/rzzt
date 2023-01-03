import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      // 默认路由,访问父路径,默认访问为空的路径的子页面''
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index.vue'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
