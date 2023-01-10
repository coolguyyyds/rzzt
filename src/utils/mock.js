import mockjs from 'mockjs'
// 拦截ajax请求,模拟数据
// 路径不能写完整,只能写部分路径
mockjs.mock('/api/sys/profile', 'post', function() {
  // 自己模拟数据
  return {
    success: true,
    code: 10000,
    data: {
      userId: '604f764971f93f3ac8f365c2',
      mobile: '13800000002',
      username: '1111',
      roles: {
        menus: [
          'employees',
          'settings',
          'permissions',
          'social_securitys',
          'approvals',
          'attendances',
          'salarys',
          'departments'
          // '人事'
        ],
        points: [
          'add-dept'
        ],
        apis: []
      },
      companyId: '1',
      company: '传智播客'
    },
    message: '获取资料成功'
  }
})
