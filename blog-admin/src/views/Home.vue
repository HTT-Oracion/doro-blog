<template>
  <div class="home-page">
    <el-container>
      <el-header>
        <div class="title">
          <el-button class="logout" @click="logout">退出登录</el-button>
          <h1>博客后台</h1>
        </div>
      </el-header>
      <el-container>
        <el-aside width="270px" class="home-aside">
          <el-menu
            :uniqueOpened="true"
            :default-active="activeIndex"
            :collapse-transition="false"
            background-color="#fff"
            text-color="#666666"
            active-text-color="#8dc5e3"
            router
          >
            <el-menu-item index="/home">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                后台首页
              </template></el-menu-item
            >
            <el-menu-item index="/users">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                用户管理
              </template></el-menu-item
            >
            <el-submenu
              v-for="item in navList"
              :key="item.id"
              :index="item.index"
            >
              <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="subitem in item.children"
                :key="subitem.id"
                :index="subitem.index"
              >
                <template #title>
                  <i :class="subitem.icon"></i>
                  <span>{{ subitem.title }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>by doro 2021</el-footer>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { clearStorage } from '@/utils/storage'
export default {
  name: 'Home',
  data () {
    return {
      activeIndex: '',
      navList: [
        {
          id: "2", index: '/articles', title: '文章管理', icon: "el-icon-s-home",
          children: [
            { id: "2-1", index: '/articles', title: "文章列表", icon: "el-icon-menu" },
            { id: "2-2", index: '/article/add', title: "添加文章", icon: "el-icon-menu" }
          ]
        },
        {
          id: "3", index: '/comments', title: '留言管理', icon: "el-icon-chat-dot-round",
          children: [
            { id: "3-1", index: '/comments', title: "留言列表", icon: "el-icon-menu" },
          ]
        },
        {
          id: "4", index: '/others', title: '图片标签', icon: "el-icon-picture",
          children: [
            { id: "4-1", index: '/others', title: "详细列表", icon: "el-icon-menu" }
          ]
        }
      ]
    }
  },
  watch: {
    $route () {
      this.setIndex()
    }
  },
  methods: {
    changeIndex (index) {
      // console.log('route', this.$route.path);
      // console.log(index);
      // store.commit('setActiveIndex', index)
      // this.activeIndex = index
    },
    setIndex () {
      this.activeIndex = this.$route.path
    },
    logout () {
      clearStorage()
      router.push('/login')
    }
  },
  created () {
    this.setIndex()
  }
}
</script>

<style lang="less">
.home-page {
  height: 100%;
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    .title {
      .logout {
        float: left;
        margin-bottom: 5px;
        vertical-align: middle;
      }
      h1 {
        margin-top: 15px;
        text-align: center;
        font-size: 24px;
        color: #666666;
      }
    }
  }
}
</style>