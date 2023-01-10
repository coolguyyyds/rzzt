<template>
  <div>
    <!-- :visible="true" title="新增权限" @close="close" -->
    <el-dialog :title="form.id ? '编辑权限': '新增权限'" v-bind="$attrs" v-on="$listeners" @open="onOpen">
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入权限名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" placeholder="请输入权限标识" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入权限描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="开启" prop="enVisible">
          <el-switch v-model="form.enVisible" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="$listeners.close()">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { addPermission, updatePermission } from '@/api/permisson'
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: 0
      },
      rules: {
        name: [{
          required: true,
          message: '请输入权限名称',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入权限标识',
          trigger: 'blur'
        }],
        description: []
      },
      isAddPerm: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() { },
    // 没走就不用了
    // close() {
    //   this.$refs['formRef'].resetFields()
    //   this.$emit('update:visible', false)
    // },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          updatePermission(this.form)
        } else {
          await addPermission(this.form)
        }
        this.$message.success('操作成功')
        this.$parent.getPermissionList()
        this.$listeners.close()
      })
    }
  }
}

</script>
<style>
</style>
