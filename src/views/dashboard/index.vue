<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    <image-upload></image-upload>
    <input ref="fileRef" type="file" />
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDxiEYfT3TfdPyIOHyQerFayFI7kBSXN0S',
  SecretKey: 'MWWKuNdfS2PXR7LXXKuKYZMuGPL6iAPS'
})
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
  },
  mounted() {
    this.$refs.fileRef.onchange = function(e) {
      // 得到文件对象
      // e.target.files[0]
      const file = this.files[0]
      console.log(file)
      // 调用cos对象方法, 上传文件对象
      cos.uploadFile({
        Bucket: 'rzzt-1316451840', /* 填写自己的 bucket，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function(err, data) {
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功', data)
        }
      })
    }
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
