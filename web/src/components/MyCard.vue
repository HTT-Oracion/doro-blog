<template>
  <div>
    <el-card class="article-card" :body-style="{ padding: '0px' }">
      <div class="card-container">
        <div class="card-header">
          <router-link tag="span" :to="linkto" class="article-title">
            {{ title }}
          </router-link>
        </div>
        <div class="card-info">
          <i class="el-icon-date"></i>
          <span>{{ date }}</span>
          <i class="el-icon-s-comment">{{ comment_count }}</i>
        </div>
        <router-link tag="div" class="card-cover" :to="linkto">
          <img :src="cover" />
        </router-link>
      </div>
    </el-card>
    <el-popover
      ref="popover"
      placement="top-end"
      title="标题"
      :width="200"
      trigger="hover"
      :content="introduction"
    >
    </el-popover>
  </div>
  <!-- <el-card class="article-card" :body-style="{ padding: '0px' }">
    <div class="card-container">
      <div class="card-header">
        <router-link tag="span" to="/" class="article-title">
          标题
        </router-link>
      </div>
      <div class="card-info">
        <i class="el-icon-date"></i>
        <span>{{ Date.now() }}</span>
        <i class="el-icon-s-comment">8</i>
      </div>
      <router-link tag="div" class="card-cover" to="/">
        <el-image
          fit="cover"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        >
        </el-image>
      </router-link>
    </div>
  </el-card> -->
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    title: { type: String, default: '标题' },
    date: { type: [String, Number], default: Date.now() },
    comment_count: { type: Number, default: 8 },
    tags: {
      type: Array,
      default () {
        return ['vue', 'react', 'angular', 'node']
      }
    },
    cover:
    {
      type: String,
      default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    introduction: { type: String, default: '这是描述信息' },
    linkto: { type: String, default: '/homecontent' }
  }
}
</script>

<style lang="less">
.article-card {
  // background-color: pink;
  width: 100%;
  // max-height: 710px !important;
  margin-bottom: 10px;
  text-align: center;
  // padding: 5px;
  .card-container {
    width: 100%;
    .card-header {
      padding: 10px 15px 0px 15px;
      transition: all 0.5s;
      .article-title {
        font-size: 32px;
        background-color: rgba(30, 199, 230, 0.8);
        color: #fff;
        &:hover {
          background-color: #fff;
          text-shadow: 0 0 10px #1ec7e6, 0 0 20px #1ec7e6, 0 0 30px #1ec7e6,
            0 0 40px #1ec7e6;
        }
      }
    }
    .card-info {
      margin-top: 15px;
      font-size: 18px;
      color: #999;
      i {
        margin: 0 5px;
      }
    }
    .card-cover {
      display: block;
      padding: 25px;
      margin: 20px;
      border-radius: 4px;
      background-color: rgba(230, 238, 232, 0.65);
      box-shadow: 0px 0px 8px #000;
      opacity: 0.7;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        max-width: 980px;
        max-height: 550px;
        border-radius: 2px;
        display: block;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>