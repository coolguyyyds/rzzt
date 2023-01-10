<template>
  <div>
    <el-upload
      action="https://rzzt-1316451840.cos.ap-nanjing.myqcloud.com"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :class="{disabled: fileList.length > 0}"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-picture-outline"></i>
    </el-upload>
    <el-progress v-if="isProgress" style="width: 180px;" :percentage="percent"></el-progress>
    <el-dialog :visible.sync="dialogVisible" title="图片预览" width="50%">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')
// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDxiEYfT3TfdPyIOHyQerFayFI7kBSXN0S',
  SecretKey: 'MWWKuNdfS2PXR7LXXKuKYZMuGPL6iAPS'
})
export default {
  name: 'ImageUpload',
  components: {},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      percent: 0,
      isProgress: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onHttpRequest({ file }) {
      this.isProgress = true
      this.fileList.push({ url: URL.createObjectURL(file) })
      // 调用cos对象方法, 上传文件对象
      cos.uploadFile({
        Bucket: 'rzzt-1316451840', /* 填写自己的 bucket，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        this.isProgress = false
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功', data)
          this.fileList[0].url = 'http://' + data.Location
        }
      })
    },
    beforeUpload({ type, size }) {
      if (!['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(type)) {
        this.$message.error('文件格式不符')
        return false
      }
      if (size > 5 * 1024 * 1024) {
        this.$message.error('超过文件大小，请稍后重试')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none;
}
</style>
