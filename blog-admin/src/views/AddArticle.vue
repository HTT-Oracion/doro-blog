<template>
  <div class="add-article-page">
    <bread-crumb nameOne="文章管理" nameTwo="添加文章"></bread-crumb>
    <el-form
      :model="articleForm"
      ref="articleForm"
      :rules="articleFormRules"
      class="add-article-form"
    >
      <el-form-item label="标题:" prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="introduction">
        <el-input v-model="articleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="标签:" prop="tags">
        <el-input v-model="articleForm.tags"></el-input>
      </el-form-item>
      <el-form-item label="图片:" prop="cover">
        <el-upload
          :action="action"
          :http-request="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
          :headers="headers"
          show-file-list
          :auto-upload="false"
          :limit="1"
          ref="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="作者名:" prop="author">
        <el-input v-model="articleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="主体内容:" prop="content">
        <mavon-editor v-model="articleForm.content" />
      </el-form-item>
      <el-form-item class="btns">
        <el-button @click="reset('articleForm')">重置</el-button>
        <el-button type="primary" @click="confirmAdd('articleForm')"
          >添加文章</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <img :src="previewSrc" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { errorTip } from '@/utils/viewTools'
import { articleFormRules } from '@/utils/validateRules'
import { addArticleRequest } from '@/api/article'
import router from '@/router'
export default {
  name: 'AddArticle',
  data () {
    return {
      articleForm: {
        title: '',
        introduction: '',
        tags: '',
        cover: '',
        author: '',
        content: ''
      },
      articleFormRules: articleFormRules,
      headers: {},
      action: 'http://localhost:3333/upload',
      dialogVisible: false,
      previewSrc: '',
      isPicUpload: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
      this.previewSrc = ''
    },
    handlePreview (file) {
      this.dialogVisible = true
      if (!this.isPicUpload) {
        return this.upload()
      }
    },
    handleRemove () {
      this.articleForm.cover = ''
      this.previewSrc = ''
    },
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList);
    },
    reset (formName) {
      this.$refs[formName].resetFields();
    },

    // 上传图片
    async upload () {
      let file = this.$refs.upload.uploadFiles[0]
      let formdata = new FormData()
      formdata.append('file', file.raw)
      const { data } = await axios.post(this.action, formdata)
      this.previewSrc = data.url
      this.articleForm.cover = data.url
      this.isPicUpload = true
    },
    // 添加文章
    confirmAdd (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return errorTip('请填写完整')
        if (!this.isPicUpload) {
          await this.upload()
        }
        await addArticleRequest(this.articleForm)
        this.$refs.articleForm.resetFields()
        router.push('/articles')
      })
    }
  }
}
</script>

<style lang="less">
.add-article-page {
  .add-article-form {
    border: 1px solid #f2f2f2;
    padding: 10px 15px;
    .el-form-item__label {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>