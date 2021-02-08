<template>
  <div class="register-page">
    <div class="register-box">
      <h1>用户注册</h1>
      <el-form
        class="register-form"
        :rules="registerRules"
        :model="registerForm"
        ref="registerRef"
        label-width="80px"
      >
        <el-form-item prop="username" label="账号">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入账号"
            clearable
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input
            v-model="registerForm.mobile"
            placeholder="请输入手机号"
            clearable
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerForm.password"
            placeholder="请输入密码"
            show-password
            type="password"
            clearable
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword" label="确认密码">
          <el-input
            v-model="rePassword"
            placeholder="请输入密码"
            show-password
            type="password"
            clearable
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            clearable
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns register-btn">
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="confirmRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { registerRules } from '@/utils/validateRules'
import { registerRequest } from '@/api/login'
import { errorTip } from '@/utils/viewTools'
import { useRouter } from 'vue-router'
export default {
  name: 'Register',
  setup () {
    const router = useRouter()
    const registerRef = ref('')
    const state = reactive({
      registerForm: {
        username: '',
        mobile: '',
        password: '',
        email: ''
      },
      registerRules,
      rePassword: ''
    })
    /* 重置 */
    const resetForm = async () => {
      registerRef.value.resetFields()
    }
    const confirmRegister = () => {
      registerRef.value.validate(async valid => {
        if (!valid) return errorTip('请填写完整!')
        if (state.rePassword !== state.registerForm.password) return errorTip('两次输入的密码不一样！')
        await registerRequest(state.registerForm, router)
      })
    }
    return {
      ...toRefs(state),
      registerRef,
      resetForm,
      confirmRegister
    }
  }
}
</script>

<style lang="less" scoped>
.register-page {
  height: 100%;
  background: gray;
  .register-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 500px;
    background: #fff;
    box-sizing: border-box;
    h1 {
      margin-top: 35px;
      text-align: center;
      font-size: 26px;
      color: rgb(95, 88, 88);
    }
    .register-form {
      width: 100%;
      margin-top: 30px;
      padding: 0 20px;
      box-sizing: border-box;
      .el-input {
        margin: 4px 0;
      }
      .register-btn {
        margin-top: 20px;
      }
    }
  }
}
</style>