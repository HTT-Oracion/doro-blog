<template>
  <el-card class="card" v-if="home">
    <my-card
      :title="article.title"
      :cover="article.cover"
      :date="article.createdAt"
      :comment_count="article.comment_count"
      :tags="article.tags"
      :introduction="article.introduction"
      :linkto="'/article/' + article.id"
    ></my-card>
    <!--
    
    -->
  </el-card>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { getArticleList } from '@/api/article'
import MyCard from './MyCard'
export default {
  name: 'HomeContent',
  components: {
    MyCard
  },
  setup () {
    const state = reactive({
      article: {},
      home: true
    })
    onMounted(async () => {
      state.article = await getArticleList()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 70%;
}
</style>