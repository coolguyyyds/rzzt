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
    },
    // /detai1相对于根路径(协议+域名+端口号)
    // detai1相对于父路径
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true,
      // 动态传参简化模板
      props: true
    },
    {
      path: 'print/:id',
      name: 'print',
      component: () => import('@/views/employees/print.vue'),
      hidden: true
    }
  ]
}
