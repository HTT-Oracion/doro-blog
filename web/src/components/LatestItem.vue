<template>
  <div class="latest__item ban-to-select" @click="toArticle(linkto)">
    <slot>内容</slot>
    <!-- <el-popover
      ref="popover"
      placement="right"
      width="100"
      trigger="hover"
      :content="item.title"
    ></el-popover> -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'LatestItem',
  props: {
    content: {
      type: String,
    },
    linkto: {
      type: String
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup () {
    const router = useRouter()
    const toArticle = id => {
      router.push(`/article/${id}`)
    }
    return {
      toArticle
    }
  }
}
</script>

<style lang="less">
.latest__item {
  border-radius: 4px;
  background: #1ec7e6;
  color: #fff;
  text-align: center;
  margin: 10px;
  &:hover {
    background: #fff;
    text-shadow: 0 0 10px #1ec7e6, 0 0 20px #1ec7e6, 0 0 30px #1ec7e6,
      0 0 40px #1ec7e6;
    cursor: pointer;
  }
}
</style>