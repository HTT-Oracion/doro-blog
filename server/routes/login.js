const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')
const secretKey = require('../key')
userRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  if (!user || user.length === 0) {
    return res.json({
      status: 400,
      msg: '用户不存在!'
    })
  } else {
    // console.log(user.getDataValue('password'));
    const isPassword = bcrypt.compareSync(password, user.getDataValue('password'))
    if (!isPassword) {
      return res.json({
        status: 400,
        msg: '密码错误!'
      })
    }
    const token = 'Bearer ' + jwt.sign({
      id: user.getDataValue('id')
    },
      secretKey,
      {
        expiresIn: 3600 * 24 * 3
      })
    return res.status(200).json({
      status: 200,
      msg: '登录成功!',
      token
    })
  }
})
module.exports = userRouter