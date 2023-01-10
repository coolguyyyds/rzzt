<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录设置账号">
            <!-- el-form[:model="form" :rules="rules" ref="formRef"]>(el-form-item[label prop]>el-input[v-model="form.${1}"])*2 -->
            <el-form ref="formRef" label-width="180px" :model="form" :rules="rules" style="width: 400px;">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit">更新</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info></job-info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeBaseInfo } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/userInfo.vue'
import JobInfo from './components/jobInfo.vue'

export default {
  name: 'Detail',
  components: { UserInfo, JobInfo },
  props: {
    // 动态路由传参简化模板
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]

      }
    }
  },
  async created() {
    this.form = await getEmployeeBaseInfo(this.id)
    this.form.password = ''
  },
  mounted() {},
  methods: {
    async onSubmit() {
      await saveUserDetailById(this.form)
      this.$message.success('修改成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
