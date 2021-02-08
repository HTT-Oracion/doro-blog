const homeRouter = require('express').Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const secretKey = require('../key')
homeRouter.get('/', async (req, res) => {
  const token = req.headers.authorization.split(' ').pop()
  if (!token) return res.json({ status: 422, msg: '请登录' })
  const { id } = jwt.verify(token, secretKey)
  const user = await User.findOne({ where: { id } })
  console.log(user);
  if (!user) return res.json({ status: 400, msg: '认证失败!' })
  return res.json({
    status: 200,
    data: '数据'
  })
})

module.exports = homeRouter