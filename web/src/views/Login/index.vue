<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="title">用户登录</h1>
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
          <el-button @click="toRegister">注册</el-button>
          <el-button type="primary" @click="confirmLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loginRules } from '@/utils/validateRules'
import { loginRequest } from '@/api/login'
import { errorTip } from '@/utils/viewTools'
export default {
  name: 'Login',
  components: {
  },
  setup () {
    const loginRef = ref('')
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: loginRules
    })
    const toRegister = () => {
      router.push('/register')
    }
    const confirmLogin = () => {
      loginRef.value.validate(async valid => {
        if (!valid) return errorTip('请填写完整!')
        const token = await loginRequest(state.loginForm, router)
        store.commit('setUser', token)
        console.log(store.state);
      })
    }
    const logininfo = () => {
      if (route.params) {
        const { username, password } = route.params
        state.loginForm.username = username
        state.loginForm.password = password
      }
    }
    onMounted(() => {
      logininfo()
    })

    return {
      ...toRefs(state),
      loginRef,
      toRegister,
      confirmLogin
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  height: 100%;
  background: #333;
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