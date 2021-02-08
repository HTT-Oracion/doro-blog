<template>
  <el-card class="result-page">
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
  </el-card>
</template>

<script>
import MyCard from '@/components/MyCard'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Result',
  components: {
    MyCard
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      articleList: []
    })
    watch(() => route.query.list, () => {
      getList()
    })
    const getList = () => {
      if (!route.query.list) {
        return
      }
      const list = decodeURIComponent(route.query.list)
      state.articleList = JSON.parse(list)
      console.log(state.articleList);
    }
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style>
.result-page {
  width: 70%;
}
</style>