<template>
  <div class="users-page">
    <el-card>
      <bread-crumb nameOne="用户管理"></bread-crumb>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            @change="getUsers"
            @clear="getUsers"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click.stop="getUsers"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userList" border striped class="user-table">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template #default="scope">
            <el-tag v-if="scope.row.isAdmin" type="danger">管理员</el-tag>
            <el-tag v-else>普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="openEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              v-if="!scope.row.isAdmin"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[2, 5, 7, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户信息" :visible.sync="editVisible" width="50%">
      <el-form
        ref="editUserForm"
        :model="editUserForm"
        :rules="editUserFormRules"
        label-width="70px"
      >
        <el-form-item prop="username" label="用户名:">
          <el-input
            v-model="editUserForm.username"
            :disabled="true"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机:">
          <el-input
            v-model="editUserForm.mobile"
            :disabled="true"
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
          <el-input
            v-model="editUserForm.email"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item prop="isAdmin" label="级别:">
          <el-select v-model="editUserForm.isAdmin" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('editUserForm')">取 消</el-button>
        <el-button type="primary" @click="editUser('editUserForm')"
          >保存提交</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加用户对话框 -->
    <el-dialog title="注册用户" :visible.sync="addVisible" width="50%">
      <el-form
        :model="addUserForm"
        :rules="addUserFormRules"
        ref="addUserForm"
        label-width="70px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input
            clearable
            v-model="addUserForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            clearable
            type="password"
            v-model="addUserForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            clearable
            type="password"
            v-model="rePassword"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input
            clearable
            v-model="addUserForm.mobile"
            prefix-icon="el-icon-mobile-phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input
            clearable
            v-model="addUserForm.email"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-radio v-model="addUserForm.isAdmin" :label="false"
            >普通用户</el-radio
          >
          <el-radio v-model="addUserForm.isAdmin" :label="true"
            >管理员</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('addUserForm')">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserForm')"
          >注册用户</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUserFormRules, editUserFormRules } from '@/utils/validateRules'
import {
  getUsersRequest,
  addUserRequeset,
  getUserById,
  editUserRequest,
  deleteUserById
} from '@/api/user'
import { errorTip, infoTip } from '@/utils/viewTools'
export default {
  name: 'Users',
  data () {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      userList: [],
      total: 0,
      // 添加用户对话框
      addVisible: false,
      // 添加用户的表单
      addUserForm: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        isAdmin: false
      },
      // 编辑用户对话框
      editVisible: false,
      // 编辑用户的表单
      editUserForm: {
        username: '',
        mobile: '',
        email: '',
        isAdmin: false
      },
      // 确认密码
      rePassword: '',
      // 添加用户的规则
      addUserFormRules: addUserFormRules,
      editUserFormRules: editUserFormRules,
      options: [{
        value: true,
        label: '管理员'
      }, {
        value: false,
        label: '普通用户'
      }]
    }
  },
  methods: {
    closeDialog (ref) {
      this.addVisible = false
      this.editVisible = false
      this.$refs[ref].resetFields()
    },
    // 编辑
    editUser (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return errorTip('请填写完整!')
        await editUserRequest(this.editUserForm)
        this.closeDialog(ref)
        this.getUsers()
      })
    },
    // 添加
    addUser (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return errorTip('请填写完整!')
        if (this.rePassword !== this.addUserForm.password) return errorTip('两次密码输入不相同')
        await addUserRequeset(this.addUserForm)
        this.closeDialog(ref)
        this.rePassword = ''
        this.getUsers()
      })
    },
    // 删除
    async deleteUser (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return infoTip('取消了操作')
      }
      await deleteUserById(id)
      this.getUsers()
    },
    // 编辑用户按钮
    async openEditDialog (id) {
      this.editUserForm = await getUserById(id)
      this.editVisible = true
    },
    async getUsers () {
      const { result, total } = await getUsersRequest(this.queryInfo)
      this.userList = result
      console.log(this.userList);
      this.total = total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUsers()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUsers()
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style lang="less">
.users-page {
  .user-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-select {
    width: 100%;
  }
}
</style>