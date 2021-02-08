/* 表单校验规则 */
// fn 邮箱校验器
const checkEmail = (rule, value, callback) => {
  const regEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  if (regEmail.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的邮箱！'))
}
// fn 手机号码校验器
const checkMobile = (rule, value, callback) => {
  const mobileReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  if (mobileReg.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的手机号！'))
}
// 登录
export const loginRules = {
  username: [
    { required: true, message: '请输入账号!', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码!', trigger: 'blur' }
  ]
}
// 添加用户
export const addUserFormRules = {
  username: [
    { required: true, message: '请输入账号!', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码!', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在6 到 16 个字符', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码!', trigger: 'blur' },
    { validator: checkMobile, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱!', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' }
  ]
}
// 编辑用户
export const editUserFormRules = {
  username: [
    { required: true, message: '请输入账号!', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号码!', trigger: 'blur' },
    { validator: checkMobile, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱!', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' }
  ],
  isAdmin: [
    { required: true, message: '请选择用户级别!', trigger: 'blur' },
  ]
}
// 添加文章
export const articleFormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],

  introduction: [
    { required: true, message: '请输入描述信息', trigger: 'blur' },
    { min: 6, message: '最少为6个字符', trigger: 'blur' }
  ],
  cover: [],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ],
  tags: [
    { required: true, message: '请输入标签', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ]
}