// import Vue from 'vue'
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)
// # 学习以插件方式来注册组件
// 查看文档:
//     api-https://v2.cn.vuejs.org/v2/api/#Vue-use
//     语法-https://v2.cn.vuejs.org/v2/guide/plugins.html
//     例子:https://gitee.com/ElemeFE/element/blob/dev/src/index.js
// 自己写一个插件
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}

