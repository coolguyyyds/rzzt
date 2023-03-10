<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <!-- vue2.6之前写法 slot="插槽名称"-->
        <!-- vue2.6之后写法 -->
        <template v-slot:before>
          <span>当前共有{{ pageParams.total }}条数据</span>
        </template>
        <template #after>
          <el-button type="danger" size="small" @click="onExport">员工导出</el-button>
          <el-button type="success" size="small" @click="$router.push('/import')">员工导入</el-button>
          <el-button type="primary" size="small" @click="isAddEmployee = true">员工新增</el-button>
        </template>
      </page-tools>
      <el-card>
        <!-- el-card>el-table[data="list" :border="true" style="width:100%"]>el-table-column[label prop=""]{}*10 -->
        <el-table :data="list" :border="true" style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column sortable label="姓名" prop="username"></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" width="112">
            <template v-slot="{row}">
              <img v-imgerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" alt="" style="width:100px;height:100px;border-radius:50%;" @click="onQrcodeDialog(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column sortable label="手机号" prop="mobile"></el-table-column>
          <el-table-column sortable label="工号" prop="workNumber"></el-table-column>
          <el-table-column sortable label="聘用形式">
            <template v-slot="{row}">
              {{ row.formOfEmployment | formOfEmployment }}
            </template>
          </el-table-column>
          <el-table-column sortable label="部门" prop="departmentName"></el-table-column>
          <el-table-column sortable label="入职时间">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column sortable label="账号状态" prop="enableState">
            <template v-slot="{row}">
              <el-switch
                v-model="row.enableState"
                :active-value="1"
                :inactive-value="0"
                disabled
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column sortable label="操作" width="270">
            <template v-slot="{row}">
              <el-button type="text" @click="$router.push('employees/detail/' + row.id)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text" @click="onShowRoles(row.id)">角色</el-button>
              <el-button type="text" @click="onDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            layout="prev, pager, next"
            :total="pageParams.total"
            :page-size="pageParams.size"
            @current-change="onPageChange"
          >
          </el-pagination>
        </el-row>
      </el-card>

      <el-dialog
        title="提示"
        :visible.sync="isQrcodeDialog"
        width="30%"
      >
        <el-row type="flex" justify="center">
          <qrcode-vue :value="imgUrl" :size="100" level="H"></qrcode-vue>
        </el-row>
      </el-dialog>
      <add-emp :show-dialog.sync="isAddEmployee" @add-success="getUserList"></add-emp>
      <el-dialog
        title="分配权限"
        :visible.sync="rolesDialogVisible"
        width="50%"
      >
        <el-checkbox-group v-model="roleIds">
          <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
        <el-row slot="footer" type="flex" justify="center">
          <el-button size="small" @click="rolesDialogVisible = false">取消</el-button>
          <el-button type="primary" size="small" @click="onAssignRole()">确认</el-button>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { assignRoles, delEmployeeById, getUserList } from '@/api/employees'
import QrcodeVue from 'qrcode.vue'
import AddEmp from './components/addEmp.vue'
import { pick } from 'lodash'
import { formatDate, formOfEmployment } from '@/filters'
import { getRoles } from '@/api/setting'
import { getEmployeeBaseInfo } from '@/api/user'
export default {
  name: 'EmployeesPage',
  components: { QrcodeVue, AddEmp },
  data() {
    return {
      list: [],
      pageParams: {
        page: 1,
        size: 1,
        total: 0
      },
      isQrcodeDialog: false,
      imgUrl: '',
      isAddEmployee: false,
      rolesDialogVisible: false,
      roleIds: [],
      roleList: [],
      currentUserId: undefined
    }
  },
  async created() {
    this.getUserList()
    const { rows } = await getRoles({ page: 1, pagesize: 100 })
    this.roleList = rows
  },
  mounted() {},
  methods: {
    async getUserList() {
      const { total, rows } = await getUserList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    onPageChange(val) {
      this.pageParams.page = val
      this.getUserList()
    },
    onQrcodeDialog(url) {
      this.imgUrl = url
      this.isQrcodeDialog = true
    },
    async onDel(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delEmployeeById(id)
        this.$message.success('删除成功')
        // 计算总的页数
        const totalPage = Math.ceil((this.pageParams.total - 1) / this.pageParams.size)
        // 删除数据前的总页面数是否大于删除后的总页面数 如果大于则需要跳转上一页等于则不需要跳转
        const pageNum = this.pageParams.page > totalPage ? totalPage : this.pageParams.page
        // 判断是否员工数据总页数小于1页，当删除只有一页的最后一条数据时不需要跳转上一页
        this.pageParams.page = pageNum < 1 ? 1 : pageNum
        this.getUserList()
      })
    },
    onExport() {
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getUserList({ page: 1, size: this.pageParams.total })
        const headers = {
          '手机号': 'mobile',
          '姓名': 'username',
          '入职日期': 'timeOfEntry',
          '聘用形式': 'formOfEmployment',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName'
        }
        const header = Object.keys(headers)
        const data = rows.map(item => {
        // 对象的过滤(对象操作)
          const m = pick(item, Object.values(headers))
          m.timeOfEntry = formatDate(m.timeOfEntry)
          m.correctionTime = formatDate(m.correctionTime)
          m.formOfEmployment = formOfEmployment(m.formOfEmployment)
          return Object.values(m)
        })
        excel.export_json_to_excel({
          header, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    async onShowRoles(id) {
      this.currentUserId = id
      const { roleIds } = await getEmployeeBaseInfo(id)
      this.roleIds = roleIds
      this.rolesDialogVisible = true
    },
    async onAssignRole() {
      await assignRoles({
        id: this.currentUserId,
        roleIds: this.roleIds
      })
      this.$message.success('操作成功')
      this.rolesDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
