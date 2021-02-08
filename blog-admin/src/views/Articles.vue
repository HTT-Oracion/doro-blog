<template>
  <div class="articles-page">
    <el-card>
      <bread-crumb nameOne="文章管理" nameTwo="文章列表"></bread-crumb>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            @chage="getArticleList"
            @clear="getArticleList"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getArticleList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="$router.push('/article/add')"
            >添加文章</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="articleList" border striped>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="introduction" label="描述信息"></el-table-column>
        <el-table-column
          prop="click"
          label="点击数"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="comment_count"
          label="评论数"
          width="80"
        ></el-table-column>
        <el-table-column label="标签" class="tag-list">
          <template #default="scope">
            <el-tag
              v-show="item"
              v-for="(item, index) in scope.row.tags"
              :key="index"
              closable
              @close="removeTag(scope.row, item)"
              >{{ item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="deleteArticle(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[2, 5, 7, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑文章详情" :visible.sync="editFormVisible" width="50%">
      <el-form :model="editArticleForm" ref="editArticleFormRef">
        <el-form-item prop="title" label="标题">
          <el-input v-model="editArticleForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="描述">
          <el-input v-model="editArticleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="author" label="作者">
          <el-input v-model="editArticleForm.author"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset('editArticleFormRef')">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('editArticleFormRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArticlesRequest,
  getArticleById,
  updateArticleById,
  deleteArticleById
} from '@/api/article'
import { removeTagFromArcicle } from '@/api/tag'
import { infoTip } from '@/utils/viewTools'
import store from '@/store'
export default {
  name: 'Articles',
  data () {
    return {
      articleList: [],
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      editFormVisible: false,
      editArticleForm: {
        title: '',
        introduction: '',
        author: ''
      }
    }
  },
  methods: {
    reset (ref) {
      this.$refs[ref].resetFields()
    },
    async confirmEdit (ref) {
      this.editArticleForm.tags = this.editArticleForm.tags.toString()
      await updateArticleById(this.editArticleForm.id, this.editArticleForm)
      this.reset(ref)
      this.editFormVisible = false
      this.getArticleList()
    },
    async deleteArticle (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除文章, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') return infoTip('取消了操作')
      await deleteArticleById(id)
      this.getArticleList()
    },
    showEditDialog (id) {
      console.log(id);
      this.editFormVisible = true
      this.getArticleDetail(id)
    },
    async removeTag (row, name) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return infoTip('取消了操作')
      }
      await removeTagFromArcicle(row.id, name)
      const index = row.tags.indexOf(name)
      if (index !== -1) row.tags.splice(index, 1)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getArticleList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getArticleList()
    },
    async getArticleList () {
      const { result, total } = await getArticlesRequest(this.queryInfo)
      this.articleList = result
      console.log(this.articleList);
      this.total = total
    },
    async getArticleDetail (id) {
      this.editArticleForm = await getArticleById(id)
      console.log(this.editArticleForm);
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style lang="less">
.articles-page {
  .el-table {
    margin-top: 20px;
    .el-tag {
      margin: 2px 4px;
    }
  }
}
</style>