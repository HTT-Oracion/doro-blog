<template>
  <el-card class="article-page">
    <div class="markdown-body">
      <VueMarkdownIt :source="articleData.content" :plugins="plugins" />
      <div class="comment-input">
        <el-input
          type="textarea"
          :rows="2"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="commentForm.content"
        >
        </el-input>
        <el-button type="primary" round @click="addComment">发布</el-button>
      </div>
      <div class="comment-list">
        <comment-item
          v-for="item in commentList.slice(
            (pageNum - 1) * pageSize,
            pageNum * pageSize
          )"
          :key="item.id"
          :date="item.date"
          :content="item.content"
          :id="item.userId"
        ></comment-item>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import VueMarkdownIt from 'vue3-markdown-it';
import CommentItem from '@/components/CommentItem'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import { addCommentByArticle, getCommentsByArticle } from '@/api/comment'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleList } from '@/api/article'
export default {
  name: 'Article',
  components: {
    VueMarkdownIt,
    CommentItem,
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      articleData: {},
      plugins: [
        {
          plugin: MarkdownItTocDoneRight
        }
      ],
      commentForm: {
        content: ''
      },
      commentList: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    })
    watch(() => route.params.id, () => {
      getArticleDetail()
    })
    const handleSizeChange = (newSize) => {
      state.pageSize = newSize
    }
    const handleCurrentChange = (newPage) => {
      state.pageNum = newPage
    }
    const addComment = async () => {
      await addCommentByArticle(route.params.id, state.commentForm)
      getComments()
    }
    const getComments = async () => {
      state.commentList = await getCommentsByArticle(route.params.id)
      state.total = state.commentList.length
    }
    const getArticleDetail = async () => {
      state.articleData = await getArticleList(route.params.id)
      await getComments()
      console.log(state.articleData);
    }
    onMounted(async () => {
      getArticleDetail()
    })
    return {
      ...toRefs(state),
      addComment,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  width: 70%;
}
.comment-input {
  margin: 10px;
  text-align: right;
  .el-button {
    margin-top: 10px;
  }
}
.comment-list {
  margin: 10px;
}
</style>