<template>
  <div class="home-container">
    <el-container style="height: 100%">
      <el-header :style="{ opacity: headerOpacity }">
        <blog-header></blog-header>
      </el-header>
      <el-container>
        <el-aside width="270px" class="home-aside"
          ><left-search></left-search> <left-latest></left-latest
        ></el-aside>
        <el-container>
          <el-main class="main-container">
            <router-view></router-view>
            <!-- <person-info></person-info> -->
          </el-main>
        </el-container>
      </el-container>
      <el-footer>@2021 By doro</el-footer>
    </el-container>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader'
import LeftSearch from '@/components/LeftSearch'
import LeftLatest from '@/components/LeftLatest'
import PersonInfo from '@/components/PersonInfo'
import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
export default {
  name: 'Home',
  components: {
    BlogHeader,
    LeftSearch,
    LeftLatest,
    PersonInfo
  },
  setup () {
    const state = reactive({
      headerOpacity: 0.8
    })
    const handleScroll = () => {
      let scrollHeight = window.pageYOffset - 60
      if (scrollHeight > 0 && scrollHeight < 60) {
        state.headerOpacity = 0.9
      } else if (scrollHeight >= 60) {
        state.headerOpacity = 1
      } else {
        state.headerOpacity = 0.8
      }

    }
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      document.removeEventListener('scroll', handleScroll)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less">
.home-container {
  height: 100%;
  .el-aside {
    position: fixed;
    top: 60px;
    left: 0;
  }
  .el-header {
    padding: 0 !important;
    // opacity: 0.8;
    overflow: hidden;
  }
  .el-footer {
    font-size: 14px;
    text-align: center;
    color: #000;
  }
  .el-menu a {
    text-decoration: none;
    color: #fff;
    display: inline-block;
    /*跟随父元素的宽高*/
    height: 100%;
    width: 100%;
  }
  .main-container {
    position: relative;
    margin-left: 270px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>