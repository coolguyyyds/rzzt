<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <qrcode-vue :value="imgUrl" :size="size" level="H"></qrcode-vue>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'Dashboard',
  components: {
    QrcodeVue
  },
  data() {
    return {
      value: 'https://example.com',
      size: 100
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
