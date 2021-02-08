<template>
  <el-card class="search">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="queryInfo.query"
      clearable
      @keyup.enter="searchArticle"
      @clear="searchArticle"
    ></el-input>
  </el-card>
</template>

<script>
import { getArticlesRequest } from '@/api/article'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'LeftSearch',
  setup () {
    const router = useRouter()
    const state = reactive({
      queryInfo: {
        query: ''
      }
    })
    const searchArticle = async () => {
      console.log(state.queryInfo);
      const { result } = await getArticlesRequest(state.queryInfo)
      // console.log(data);
      const str = JSON.stringify(result)
      router.push({ name: 'Result', query: { list: encodeURIComponent(str) } })
    }
    return {
      ...toRefs(state),
      searchArticle
    }
  }
}
</script>

<style lang="less">
.search {
  width: 220px;
  margin-top: 20px;
  margin-left: 15%;
  box-sizing: border-box;
}
.search .el-card__body {
  padding: 5px;
}
</style>