<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="title">管理员登录</h1>
      <el-form
        class="login-form"
        label-width="60px"
        :rules="loginFormRules"
        :model="loginForm"
        ref="loginRef"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="loginForm.username"
            clearable
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            clearable
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="reset('loginRef')">重置</el-button>
          <el-button type="primary" @click="confirmLogin('loginRef')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { lgReq } from '@/api/login'
import { loginRules } from '@/utils/validateRules'
import { errorTip } from '@/utils/viewTools'
import store from '@/store'
import router from '@/router'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin1',
        password: '888888'
      },
      loginFormRules: loginRules
    }
  },
  methods: {
    confirmLogin (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return errorTip('请填写完整!')
        const token = await lgReq(this.loginForm,this.$router)
        store.commit('setAdmin', token)
        console.log(store.state.admin);
      })
    },
    reset (ref) {
      this.$refs[ref].resetFields()
    }
  }
}
</script>

<style lang="less">
.login-page {
  height: 100%;
  background: url('../assets/img/login.jpg');
  background-size: cover;
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    h1 {
      margin-top: 45px;
      text-align: center;
      font-size: 26px;
      color: rgb(95, 88, 88);
    }
    .login-form {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 20px;
      box-sizing: border-box;
      .el-input {
        margin: 2px 0;
      }
    }
  }
}
</style>