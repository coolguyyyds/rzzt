<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :has-before="false">
        <template #after>
          <el-button type="primary" size="small" @click="onAdd({pid: '0', type: 1})">新增权限</el-button>
        </template>
      </PageTools>
      <el-table :data="list" :border="true" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column v-slot="{row}" label="操作">
          <el-button type="text" @click="onAdd({pid: row.id, type: 2})">添加</el-button>
          <el-button type="text" @click="onUpdate(row.id)">编辑</el-button>
          <el-button type="text" @click="onDel(row.id)">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <add-perm v-if="showDialog" ref="addPermRef" :visible="showDialog" @close="showDialog = false"></add-perm>
  </div>
</template>

<script>
import { delPermission, getPermissionDetail, getPermissionList } from '@/api/permisson'
import { translateListToTree } from '@/utils'
import AddPerm from './components/AddPerm.vue'
export default {
  name: 'PermissionPage',
  components: { AddPerm },
  data() {
    return {
      list: [],
      showDialog: false
    }
  },
  created() {
    this.getPermissionList()
  },
  mounted() { },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.list = translateListToTree(data, '0')
    },
    async onAdd(data) {
      this.showDialog = true
      // 对象赋值浅拷贝
      await this.$nextTick()
      Object.assign(this.$refs.addPermRef.form, data)
    },
    onDel(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      })
    },
    async onUpdate(id) {
      const form = await getPermissionDetail(id)
      this.showDialog = true
      await this.$nextTick()
      this.$refs.addPermRef.form = form
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
