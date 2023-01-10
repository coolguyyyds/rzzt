<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :on-success="onSuccess"></upload-excel>
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'

export default {
  components: {},
  data() {
    return {

    }
  },
  created() { },
  mounted() { },
  methods: {
    async onSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const data = results.map(el => {
        const item = {}
        for (const key in el) {
          const newKey = userRelations[key]
          item[newKey] = el[key]
        }
        return item
      })
      await importEmployee(data)
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
