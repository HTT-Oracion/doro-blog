const regRouter = require('express').Router()
const User = require('../model/user')
regRouter.post('/', async (req, res) => {
  const { id, username, password, mobile, email } = req.body
  const users = await User.findOne({
    where: { username, mobile: String(mobile) }
  })
  if (users.length === 0) {
    const user = await User.create({
      id,
      username,
      password: require('bcrypt').hashSync(password, 10),
      mobile: String(mobile),
      email
    })
    console.log(user.toJSON());
    return res.status(201).json({
      status: 201,
      msg: '创建用户成功!'
    })
  } else {
    return res.json({
      status: 400,
      msg: '用户手机号码或用户名已存在!'
    })
  }

})
module.exports = regRouter