<template>
  <div class="others-page">
    <el-upload
      ref="upload"
      :limit="1"
      :http-request="upload"
      action="http://localhost:3333/upload"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-button type="primary" @click="upload">确认上传</el-button>
    <img :src="src" alt="" />
  </div>
</template>

<script>
import axios from 'axios'
import { errorTip } from '@/utils/viewTools'
export default {
  name: 'Others',
  data () {
    return {
      fileList: [],
      src: ''
    }
  },
  methods: {
    async upload () {
      let file = this.$refs.upload.uploadFiles[0]
      console.log(file);
      let formdata = new FormData()
      formdata.append('file', file.raw)
      const { data } = await axios.post('http://localhost:3333/upload', formdata)
      this.src = data.url
      // const formdata = new FormData()
      // const file = this.$refs.upload.uploadFiles[0]
      // console.log(file);
      // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      // if (!file) return errorTip('请选择图片')
      // formdata.append('file', file.row)
      // formdata.append('name', file.name)
      // formdata.append('id', file.uid)
      // const result = await axios.post('http://localhost:3333/upload', formdata, headerConfig)
      // console.log(result);
    },
    handlePreview () {

    },
    handleRemove () {

    }
  }
}
</script>

<style>
</style>