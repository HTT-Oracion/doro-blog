<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#9ce7f4"
    router
    class="blog-navber"
  >
    <el-menu-item
      class="blog-logo"
      index="/homecontent"
      @click="changeIndex('/homecontent')"
      >My-logo</el-menu-item
    >
    <el-menu-item
      v-for="item in tabList"
      :key="item.id"
      :index="item.index"
      @click="changeIndex(item.index)"
    >
      <i :class="item.icon"></i>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
    <el-menu-item>
      <i class="el-icon-s-cooperation"></i>
      <template #title>工具站</template>
    </el-menu-item>
    <el-menu-item>
      <i class="el-icon-video-play"></i>
      <template #title> <a href="http://www.bilibili.tv">bilibili</a></template>
    </el-menu-item>
    <el-menu-item class="login-btn" @click="logout">
      <i class="el-icon-s-fold"></i>
      <template #title>退出</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'BlogHeader',
  setup () {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      activeIndex: store.state.activeIndex || '/homecontent',
      tabList: [
        { id: 0, name: '首页', icon: "el-icon-s-home", index: "/homecontent" },
        { id: 1, name: '文章', icon: "el-icon-document", index: "/article/list" },
        { id: 2, name: '照片墙', icon: "el-icon-picture-outline", index: "/photo" },
        { id: 3, name: '标签墙', icon: "el-icon-price-tag", index: "/tags" },
        { id: 4, name: '留言板', icon: "el-icon-chat-dot-square", index: "/comment" }
      ]
    })
    const changeIndex = (index) => {
      store.commit('setActiveIndex', index)
      state.activeIndex = index
    }
    const logout = () => {
      store.commit('setUser', '')
      router.push('/login')
    }
    return {
      ...toRefs(state),
      logout,
      changeIndex
    }
  }
}
</script>

<style lang="less" scoped>
.blog-navber {
  width: 100%;
  border: 0 !important;
  z-index: 99;
  // overflow: hidden;
  .el-menu-item {
    border: 0 !important;
    font-size: 16px;
    i {
      margin-top: -2px;
    }
  }
  .el-submenu__title {
    font-size: 16px;
  }
  .blog-logo {
    text-align: center;
    width: 270px;
    height: 100%;
  }
  .login-btn {
    position: absolute;
    right: 0;
    top: 0;
    color: #f5f5f5 !important;
  }
}
</style>