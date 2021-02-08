<template>
  <el-card class="latest">
    <el-collapse accordion @change="change">
      <!-- 最新评论 -->
      <el-collapse-item>
        <template #title>
          最新评论<i class="header-icon el-icon-info"></i>
        </template>
        <latest-item
          v-for="item in newComment"
          :key="item.id"
          :content="item.content"
          :linkto="item.articleId"
          >{{ item.content }}</latest-item
        >
      </el-collapse-item>
      <!-- 最新文章 -->
      <el-collapse-item>
        <template #title>
          最新文章<i class="header-icon el-icon-info"></i>
        </template>
        <latest-item
          v-for="item in newArticle"
          :key="item.id"
          :content="item.title"
          :linkto="item.id"
          >{{ item.title }}</latest-item
        >
      </el-collapse-item>
      <!-- 随机文章 -->
      <el-collapse-item class="rand-article">
        <template #title>
          随机文章
          <i class="header-icon el-icon-refresh" v-loading="loading"></i>
        </template>
        <div
          class="rand-article-change ban-to-select"
          @click="getRandArticle"
          v-if="!randList || randList.length === 0"
        >
          获取文章
        </div>
        <div
          class="rand-article-change ban-to-select"
          @click="getRandArticle"
          v-else
        >
          换一批
        </div>
        <latest-item v-for="item in randList" :key="item.id" :linkto="item.id">
          {{ item.title }}
        </latest-item>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import LatestItem from './LatestItem'
import { getRandArticleRequest, getNewestArticle } from '@/api/article'
import { getNewestComment } from '@/api/comment'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'LeftLatest',
  components: {
    LatestItem
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      randList: [],
      newComment: [],
      newArticle: [],
      loading: false
    })
    const change = () => {

    }
    watch(() => store.state.changeLoad, () => {
      state.loading = store.state.changeLoad
      console.log(state.loading);
    })
    const getRandArticle = async () => {
      try {
        state.randList = await getRandArticleRequest()
        console.log(state.randList);
      } catch {
        return
      }
    }
    const getNewest = async () => {
      state.newArticle = await getNewestArticle()
      state.newComment = await getNewestComment()
    }
    onMounted(() => {
      getNewest()
    })
    return {
      ...toRefs(state),
      change,
      getRandArticle
    }
  }
}
</script>

<style lang="less" scoped>
.latest {
  width: 220px;
  margin-top: 15px;
  margin-left: 15%;
  box-sizing: border-box;
  .el-card__body {
    padding: 5px;
  }
  .rand-article {
    padding: 5px;
    .rand-article-change {
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      border-radius: 4px;
      background-color: rgba(23, 221, 99, 0.726);
    }
    .rand-article__item {
      border-radius: 4px;
      background: #1ec7e6;
      color: #fff;
      text-align: center;
      margin: 10px;
      &:hover {
        background: #fff;
        text-shadow: 0 0 10px #1ec7e6, 0 0 20px #1ec7e6, 0 0 30px #1ec7e6,
          0 0 40px #1ec7e6;
      }
    }
  }
}
</style>