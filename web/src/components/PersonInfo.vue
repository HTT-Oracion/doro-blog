<template>
  <div class="person-info">
    <div class="info-box">
      <!-- 头像 -->
      <div class="person-avatar">
        <img src="../assets/img/avatar.png" alt="" />
      </div>
      <div class="person-name">Doro</div>
      <div class="person-nav">
        <div class="person-nav-articles">
          <span>文章</span>
          <span>{{ $store.state.articlesNumber || 0 }}</span>
        </div>
        <div class="ray"></div>
        <div class="person-nav-tags">
          <span>标签</span>
          <span>{{ $store.state.tagsNumber || 0 }}</span>
        </div>
      </div>
    </div>
    <div class="tag-box">
      <div class="tag-title">
        <i class="el-icon-price-tag"></i>
        标签
      </div>
      <Tags :isPage="false" />
    </div>
  </div>
</template>

<script>
import Tags from '@/views/Tags'
import { getTagsRequest } from '@/api/tag'
import { onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'PersonInfo',
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  },
  components: {
    Tags
  },
  setup () {
    const store = useStore()
    const state = reactive({
      imgSrc: '',
      tagList: []
    })
    const getTags = async () => {
      state.tagList = await getTagsRequest()
      store.commit('setTagsNumber', state.tagList.length)
      store.commit('setTagList', state.tagList)
    }
    onMounted(() => {
      getTags()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less">
.person-info {
  position: absolute;
  top: 20px;
  right: 50px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .info-box {
    height: 100%;
    .person-avatar {
      margin: 5px auto;
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .person-name {
      text-align: center;
      margin: 30px auto;
      font-size: 20px;
      font-weight: 600;
    }
    .person-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .ray {
        height: 100%;
        width: 1px;
        background-color: #000;
      }
      .person-nav-articles,
      .person-nav-tags {
        font-size: 18px;
        height: 50px;
        padding: 10px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > span {
          padding: 2px 0;
        }
      }
    }
  }
  .tag-box {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    .tag-title {
      margin: 15px 10px 20px 10px;
    }
    .tag-list {
      padding: 10px;
    }
  }
}
</style>