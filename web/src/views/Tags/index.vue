<template>
  <div class="tags-container">
    <el-card v-if="isPage">
      <template #header>标签墙</template>
      <!-- 标签列表 -->
      <div class="tag-list">
        <el-tag
          @click="open(item.name)"
          v-for="item in tagList"
          :key="item.id"
          >{{ item.name }}</el-tag
        >
      </div>
    </el-card>
    <div class="tags" v-else>
      <el-button
        @click="open(item.name)"
        v-for="item in tagList"
        :key="item.id"
        :type="randType"
        size="mini"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { getSearchRequest } from '@/api/article'
import { getTagsRequest } from '@/api/tag'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Tags',
  props: {
    isPage: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      tagList: []
    })
    const open = async (name) => {
      const articleList = await getSearchRequest(name)
      const str = JSON.stringify(articleList)
      router.push({ name: 'Result', query: { list: encodeURIComponent(str) } })
    }
    const getTags = async () => {
      state.tagList = await getTagsRequest()
      store.commit('setTagsNumber', state.tagList.length)
      store.commit('setTagList', state.tagList)
    }
    const randType = () => {
      const arr = ['default', 'danger', 'primary', 'warning', 'info']
      const rand = parseInt(Math.random() * (4 + 1), 10);
      return arr[rand]
    }
    onMounted(() => {
      getTags()
      state.tagList = store.state.tagList
    })
    return {
      open,
      ...toRefs(state),
      randType
    }
  }
}
</script>

<style lang="less" >
.tags-container {
  .el-card {
    width: 70%;
  }
  .tag-list {
    .el-tag {
      margin: 0 10px;
    }
  }
  .tags {
    padding: 10px;
    .el-button {
      margin: 5px;
    }
  }
}
</style>