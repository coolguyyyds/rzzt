<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row>
              <el-button type="primary" size="small" @click="isDialog = true">添加角色</el-button>
            </el-row>
            <el-table
              :data="list"
              border
              style="width: 100%;margin-top: 15px;"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50px"
              >
              </el-table-column>
              <el-table-column
                label="名称"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                label="描述"
                prop="description"
              >
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template v-slot="{row}">
                  <el-button type="success" size="small" @click="onShowPerm(row.id)">权限分配</el-button>
                  <el-button type="primary" size="small" @click="onEdit(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="onDel(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center">
              <el-pagination
                layout="prev, pager, next"
                :total="pageParams.total"
                :page-size="pageParams.pagesize"
                :current-page.sync="pageParams.page"
                @current-change="onCurrentChange"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
            >
            </el-alert>
            <!-- el-form>(el-form-item[label]>el-input[v-model="info.xxx" :disabled="true"]{})*4 -->
            <el-form label-width="80px" style="width: 400px;margin: 20px 0 0 20px;">
              <el-form-item label="公司名称">
                <el-input v-model="info.name" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="info.companyAddress" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="info.mailbox" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="info.remarks" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog v-bind="$attrs" :title="form.id ? '编辑角色' : '新增角色'" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入角色描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog v-if="showAssignPermDialog" title="分配权限" width="50%" :visible.sync="showAssignPermDialog">
      <el-tree ref="permTreeRef" node-key="id" show-checkbox :data="permList" :props="{label: 'name'}" default-expand-all></el-tree>
      <el-row slot="footer" type="flex" justify="center">
        <el-button size="small" @click="showAssignPermDialog= false">取消</el-button>
        <el-button type="primary" size="small" @click="onAssignPerm()">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { addRole, assignRolePrem, delRole, editRole, getCompanyInfo, getRoleById, getRoles } from '@/api/setting'
import { translateListToTree } from '@/utils'

export default {
  name: 'SettingPage',
  components: {},
  data() {
    return {
      info: {},
      list: [],
      permList: [],
      isDialog: false,
      pageParams: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      form: {
        name: undefined,
        description: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        description: []
      },
      showAssignPermDialog: false,
      // roleIds: [],
      permsList: [],
      currentRoleId: undefined,
      permIds: [],
      currentPermId: undefined
    }
  },
  async created() {
    this.info = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    this.getRoles()
    this.getPermissionList()
  },
  mounted() {},
  methods: {
    async getRoles() {
      const { rows, total } = await getRoles(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    onCurrentChange(value) {
      this.pageParams.page = value
      this.getRoles()
    },
    onOpen() {},
    close() {
      this.form = {}
      this.$refs['formRef'].resetFields()
      this.isDialog = false
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        this.form.id ? await editRole(this.form) : await addRole(this.form)
        // const totalPage = Math.ceil((this.pageParams.total + 1) / this.pageParams.pagesize)
        // this.pageParams.page = totalPage
        this.getRoles()
        this.$message.success('操作成功')
        this.close()
      })
    },
    async onEdit(id) {
      this.form = await getRoleById(id)
      // 数据回显在对话框打开前
      this.isDialog = true
    },
    onDel(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delRole(id)
        const totalPage = Math.ceil((this.pageParams.total - 1) / this.pageParams.pagesize)
        const pageNum = this.pageParams.page > totalPage ? totalPage : this.pageParams.page
        this.pageParams.page = pageNum < 1 ? 1 : pageNum
        this.$message.success('删除成功')
        this.getRoles()
      })
    },
    async onShowAssignPerm(id) {
      this.currentRoleId = id
      // 选中当前用户角色
      // const { roleIds } = await getEmployeeBaseInfo(id)
      // this.roleIds = roleIds
      // 显示对话框
      this.showAssignPermDialog = true
    },
    async onAssignPerm() {
      const permIds = this.$refs.permTreeRef.getCheckedKeys()
      await assignRolePrem({ id: this.currentPermId, permIds: permIds })
      // 提示成功
      this.$message.success('操作成功')
      // 关闭对话框
      this.showAssignPermDialog = false
    },
    async getPermissionList() {
      const data = await getPermissionList()
      this.permList = translateListToTree(data, '0')
    },
    async onShowPerm(id) {
      // <!-- 操作树组件,方式1-通过组件通信 -->
      // :default-checked-keys="permIds" @check-change="onchange"
      // <!-- 操作树组件。方式2-通过组件之间通信
      this.showAssignPermDialog = true
      this.currentPermId = id
      const { permIds } = await getRoleById(id)
      this.$refs.permTreeRef.setCheckedKeys(permIds)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
