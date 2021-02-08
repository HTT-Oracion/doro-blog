<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-if="nameOne">{{ nameOne }}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="nameTwo">{{ nameTwo }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    nameOne: {
      type: String,
      default: ''
    },
    nameTwo: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scopde>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>