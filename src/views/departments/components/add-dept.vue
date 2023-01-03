<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :visible="showDialog"
      :title="form.id ? '编辑部门' : '添加部门'"
      v-on="$listeners"
      @open="onOpen"
      @close="close"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入部门名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入部门编码"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="form.manager"
            placeholder="请选择部门负责人"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in managerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请输入部门介绍"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addDepartments, getDepartments, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/user'

export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    // 当数据发生改变,响应式
    // (1)模板
    // (2)计算属性
    currentDept: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateName = async(rule, value, cb) => {
      // const pid = this.currentDept.id
      // const { depts } = await getDepartments()
      // const brothers = depts.filter(item => item.pid === pid)
      let depts = (await getDepartments()).depts
      if (this.form.id) {
        // 编辑排除本部门
        depts = depts.filter(item => item.pid === this.form.pid && item.id !== this.form.id)
      } else {
        // 新增
        depts = depts.filter(item => item.pid === this.currentDept.id) // 查找兄弟部门
      }
      if (depts.some(item => item.name === value)) {
        cb(new Error('同级部门中禁止出现重复部门'))
      } else {
        cb()
      }
    }
    const validateCode = async(rule, value, cb) => {
      let { depts } = await getDepartments()
      // 编辑要允许编辑本部门, 排除当前部门
      if (this.form.id) {
        depts = depts.filter(item => item.id !== this.form.id)
      }
      if (depts.some(item => item.code === value)) {
        cb(new Error('部门编码重复'))
      } else {
        cb()
      }
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        name: [{
          required: true,
          message: '请输入部门名称',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 50,
          message: '请输入1-50个字符',
          trigger: 'blur'
        },
        {
          validator: validateName,
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入部门编码',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 50,
          message: '请输入1-50个字符',
          trigger: 'blur'
        },
        {
          validator: validateCode,
          trigger: 'blur'
        }],
        manager: [{
          required: true,
          message: '请选择部门负责人',
          trigger: 'change'
        }],
        introduce: [{
          required: true,
          message: '请输入部门介绍',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 300,
          message: '请输入1-300个字符',
          trigger: 'blur'
        }]
      },
      managerOptions: []
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.managerOptions = await getEmployeeSimple()
  },
  mounted() { },
  methods: {
    onOpen() { },
    close() {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      // 理解做那几件事情
      // (1)将所有字段值重置为初始值
      //    所有字段值,是el-form-item配置了prop的字段
      //    初始值,不是最开始data的值,在对话框显示之前data最后的值
      // (2)移除校验结果
      //    去除校验红色提示
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }
      this.$refs['formRef'].resetFields()
      this.$emit('update:showDialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          // 编辑
          await updateDepartments(this.form)
        } else {
          // 新增
          await addDepartments({
            ...this.form,
            pid: this.currentDept.id
          })
        }
        this.$message.success('操作成功')
        this.$emit('on-success')
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
