<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-node :data="companyInfo">
          <el-dropdown-item :disabled="!hasOwnPermission('add-dept')" @click.native="onAdd(companyInfo)">添加子部门</el-dropdown-item>
        </tree-node>
        <el-tree :data="list" :props="{label:'name'}" default-expand-all>
          <!-- 使用作用域插槽自定义树显示内容 -->
          <!-- slot-scope是vue2.6之前写法 -->
          <!-- data就是一行的数据,试题el-tree给提供的 -->
          <!-- <div slot-scope="{ data }">
            {{ data.name }}-{{ data.manager }}
          </div> -->
          <!-- v-slot是vue2.6/3之后添加写法 -->
          <!-- 注意-v-slot只能用到<template></template> -->
          <template v-slot="{data}">
            <tree-node :data="data">
              <el-dropdown-item :disabled="!hasOwnPermission('add-dept')" @click.native="onAdd(data)">添加子部门</el-dropdown-item>
              <el-dropdown-item @click.native="onUpdate(data.id)">编辑部门</el-dropdown-item>
              <el-dropdown-item @click.native="ondel(data.id)">删除部门</el-dropdown-item>
            </tree-node>
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="refAdd" :show-dialog.sync="showDialog" :current-dept="currentDept" @on-success="getList()"></add-dept>
  </div>
</template>

<script>
import TreeNode from './components/tree-node.vue'
import { delDepartments, getDepartments, getDepartmentsById } from '@/api/departments'
import { translateListToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'DepartmentsPage',
  components: { TreeNode, AddDept },
  data() {
    return {
      list: [],
      companyInfo: { name: '', manager: '负责人', id: '' },
      showDialog: false,
      currentDept: {}
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const loading = this.$loading()
      const { companyName, depts } = await getDepartments()
      this.list = translateListToTree(depts, '')
      this.companyInfo.name = companyName
      loading.close()
    },
    onAdd(data) {
      this.showDialog = true
      this.currentDept = data
    },
    async onUpdate(id) {
      const data = await getDepartmentsById(id)
      this.$refs.refAdd.form = data
      // 初始值,不是最开始data的值,在对话框显示之前data最后的值
      this.showDialog = true
    },
    ondel(id) {
      console.log('ondel', id)
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delDepartments(id)
        this.$message.success('删除成功')
        // 刷新列表
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
.el-dropdown {
  margin-left: 5px;
}
</style>
