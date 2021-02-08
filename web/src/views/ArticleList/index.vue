<template>
  <div class="article-list">
    <el-card class="article-list-card">
      <my-card
        v-for="article in articleList"
        :key="article.id"
        :title="article.title"
        :cover="article.cover"
        :date="article.createdAt"
        :comment_count="article.comment_count"
        :tags="article.tags"
        :introduction="article.introduction"
        :linkto="'/article/' + article.id"
      ></my-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyCard from '@/components/MyCard'
import HomeContent from '@/components/HomeContent'
import { getArticlesRequest } from '@/api/article'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'ArticleList',
  components: {
    MyCard,
    HomeContent
  },
  setup () {
    const store = useStore()
    const state = reactive({
      articleList: [],
      // 分页器
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0
    })
    const handleSizeChange = (newSize) => {
      state.queryInfo.pageSize = newSize
      getArticleList()
    }
    const handleCurrentChange = (newNum) => {
      state.queryInfo.pageNum = newNum
      getArticleList()
    }
    const getArticleList = async () => {
      const { result, total } = await getArticlesRequest(state.queryInfo)
      state.articleList = result
      state.total = total
      store.commit('setArticlesNumber', total)
    }
    onMounted(() => {
      getArticleList()
    })
    return {
      ...toRefs(state),
      getArticleList,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  .article-list-card {
    width: 70%;
  }
}
.el-pagination {
  margin-top: 10px;
}
</style>