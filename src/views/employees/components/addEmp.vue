<template>
  <div>
    <el-dialog v-bind="$attrs" :visible="showDialog" title="新增员工" v-on="$listeners" @open="onOpen" @close="close">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择入职时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in formOfEmploymentOptions"
              :key="index"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="form.workNumber" placeholder="请输入工号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <!-- <el-select v-model="form.departmentName" placeholder="请选择部门" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in departmentNameOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select> -->
          <el-popover
            v-model="showSelectDept"
            placement="right"
            width="470"
            trigger="click"
          >
            <el-tree :expand-on-click-node="false" :data="departmentNameOptions" :props="{label: 'name'}" default-expand-all @node-click="onClickNode"></el-tree>
            <el-input slot="reference" v-model="form.departmentName" placeholder="请选择部门" clearable :style="{width: '100%'}"></el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{width: '100%'}"
            placeholder="请选择转正时间"
            clearable
          ></el-date-picker>
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
import EmployessNum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { translateListToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [],
        mobile: [],
        timeOfEntry: [],
        formOfEmployment: [],
        workNumber: [],
        departmentName: [],
        correctionTime: []
      },
      formOfEmploymentOptions: EmployessNum.hireType,
      departmentNameOptions: [],
      showSelectDept: false
    }
  },
  computed: {},
  watch: {},
  async created() {
    const res = await getDepartments()
    const list = translateListToTree(res.depts, '')
    this.departmentNameOptions = list
  },
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      this.$refs['formRef'].resetFields()
      this.$emit('update:showDialog', false)
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        await addEmployee(this.form)
        this.$message.success('添加成功')
        this.$emit('add-success')
        this.close()
      })
    },
    onClickNode(data) {
      this.form.departmentName = data.name
      this.showSelectDept = false
    }
  }
}

</script>
<style lang="scss" scoped>
// ::v-deep .el-tree-node__expand-icon.expanded{
//   visibility: hidden;
// }
::v-deep .el-tree-node__expand-icon{
  visibility: hidden;
}
</style>
