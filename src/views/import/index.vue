<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :on-success="onSuccess"></upload-excel>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    }
  },
  created() { },
  mounted() { },
  methods: {
    onSuccess(res) {
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
