module.exports = app => {
  const {
    Sequelize,
    connect,
    User,
    Article,
    Tag,
    Comment
  } = require('../../models')
  const Op = Sequelize.Op
  const router = require('express').Router()
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')
  const secretKey = require('../../key')
  connect.sync()

  // 删除评论
  router.delete('/comment/:id', async (req, res) => {
    try {
      await Comment.destroy({
        where: { id: req.params.id }
      })
      return res.send({ status: 200, msg: '删除成功!' })
    } catch {
      return res.send({ status: 401, msg: '删除失败' })
    }
  })
  // 评论列表
  router.get('/comments', async (req, res) => {
    const query = req.query.query || '',
      pageNum = parseInt(req.query.pageNum) || 1,
      pageSize = parseInt(req.query.pageSize) || 5
    console.log(query, pageNum, pageSize);
    let whereObj = { content: { [Op.like]: '%' + query + '%' } }
    if (query) {
      const { count, rows } = await Comment.findAndCountAll({
        where: whereObj,
        limit: pageSize,
        offset: (pageNum - 1) * pageSize
      })
      return res.send({ status: 200, msg: '获取评论列表成功', result: rows, total: count })
    }
    const { count, rows } = await Comment.findAndCountAll({
      limit: pageSize,
      offset: (pageNum - 1) * pageSize
    })
    return res.send({ status: 200, msg: '获取评论列表成功', result: rows, total: count })
  })
  // 删除文章的一个tag
  router.delete('/article/tag/:id', async (req, res) => {
    const aid = req.params.id
    const name = req.query[0]
    const article = await Article.findOne({
      where: { id: aid }
    })
    let { tags } = article
    const index = tags.indexOf(name)
    if (index !== -1) tags.splice(index, 1)
    try {
      await article.update({ tags: tags.toString() }, {
        where: { id: aid }
      })
      return res.send({ status: 200, msg: '删除成功' })
    } catch {
      res.send({ status: 403, msg: 'ERROR' })
    }
  })
  // 文章列表
  router.get('/articlelist', async (req, res) => {
    const query = req.query.query,
      pageNum = parseInt(req.query.pageNum) || 1,
      pageSize = parseInt(req.query.pageSize) || 5
    let whereObj = {
      [Op.or]: [
        { title: { [Op.like]: '%' + query + '%' } },
        { introduction: { [Op.like]: '%' + query + '%' } },
        { tags: { [Op.like]: '%' + query + '%' } }
      ]
    }
    let totalArticle = 0
    let articles = []
    if (query) {
      const { count, rows } = await Article.findAndCountAll({
        raw: true,
        where: whereObj,
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
      })
      totalArticle = count
      articles = rows
    } else {
      const { count, rows } = await Article.findAndCountAll({
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
      })
      totalArticle = count
      articles = rows
    }
    if (!articles || articles.length === 0) return res.send({ status: 422, msg: '没有任何文章!' })
    res.send({ status: 200, msg: `获取文章列表成功,共${totalArticle}篇文章`, result: articles, total: totalArticle })
  })
  // 添加文章： 根据用户id添加
  router.post('/add/article', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    jwt.verify(token, secretKey, async (err, authData) => {
      if (err) {
        return res.send({ status: 403, msg: 'token无效！' })
      }
      const uid = authData.id
      const user = await User.findOne({ where: { id: uid } })
      if (!user) return res.send({ status: 422, msg: '用户不存在' })
      const {
        id,
        title,
        introduction,
        tags,
        cover,
        author,
        content } = req.body
      console.log(id,
        title,
        introduction,
        tags,
        cover,
        author,
        content);
      const article = await Article.create({
        id,
        title,
        introduction,
        tags,
        cover,
        author,
        content,
        userId: uid
      })
      if (article) return res.send({ status: 200, msg: '添加文章！' })
    })
  })
  // 通过id获取文章详情
  router.get('/article/:id', async (req, res) => {
    const article = await Article.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['password']
      }
    })
    if (!article) return res.send({ status: 422, msg: '文章不存在' })
    return res.send({ status: 200, msg: '获取文章信息成功!', result: article })
  })
  // 修改文章
  router.put('/article/:id', async (req, res) => {
    const article = await Article.update(req.body.params, {
      where: { id: req.params.id }
    })
    if (article) return res.send({ status: 200, msg: '修改成功!' })
  })
  // 删除文章
  router.delete('/article/:id', async (req, res) => {
    try {
      await Article.destroy({
        where: { id: req.params.id }
      })
      return res.send({ status: 200, msg: '删除成功!' })
    } catch {
      return res.send({ status: 400, msg: '删除失败!' })
    }
  })
  // 单个用户信息
  router.get('/user/:id', async (req, res) => {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) return res.send({ status: 422, msg: '用户不存在' })
    return res.send({ status: 200, msg: '获取用户信息成功!', result: user })
  })
  // 用户列表
  router.get('/userlist', async (req, res) => {
    const query = req.query.query,
      pageNum = parseInt(req.query.pageNum) || 1,
      pageSize = parseInt(req.query.pageSize) || 5
    console.log(query, pageSize, pageNum);
    let whereObj = {
      username: { [Op.like]: '%' + query + '%' }
    }
    let totalUser = 0
    let userList = []
    if (query) {
      const { count, rows } = await User.findAndCountAll({
        raw: true,
        where: whereObj,
        offset: (pageNum - 1) * pageSize,
        limit: pageSize
      })
      totalUser = count
      userList = rows
    } else {
      const { count, rows } = await User.findAndCountAll({
        offset: (pageNum - 1) * pageSize,
        limit: pageSize,
        attributes: {
          exclude: ['password']
        }
      })
      totalUser = count
      userList = rows
    }
    if (!userList || userList.length === 0) return res.send({ status: 422, msg: '没有查询到相关用户' })
    return res.send({ status: 200, msg: '搜索成功!', result: userList, total: totalUser })
  })
  // 添加用户 
  router.post('/user/create', async (req, res) => {
    const { id, username, password, mobile, email, isAdmin } = req.body
    const user = await User.findOne({
      where: { username, mobile: String(mobile) }
    })
    if (user) return res.send({ status: 422, msg: '用户名或手机号码已存在!' })
    const newUser = await User.create({
      id,
      username,
      password: bcrypt.hashSync(password, 10),
      mobile: String(mobile),
      email,
      isAdmin
    })
    if (newUser) return res.send({ status: 200, msg: '创建用户成功!' })
    console.log(newUser);
  })
  // 删除用户
  router.delete('/user/:id', async (req, res) => {
    const id = req.params.id
    try {
      await User.destroy({
        where: { id }
      })
      return res.send({ status: 200, msg: '删除成功!' })
    } catch {
      return res.send({ status: 400, msg: '删除失败!' })
    }

  })
  // 编辑用户信息
  router.put('/user/edit', async (req, res) => {
    const { id, username, mobile, email, isAdmin } = req.body
    const user = await User.update({
      email,
      isAdmin
    }, {
      where: {
        id
      }
    })
    if (!user) return res.send({ status: 422, msg: '修改失败' })
    return res.send({ status: 200, msg: '修改成功!' })
  })
  // 登录
  router.post('/user/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user.getDataValue('isAdmin')) return res.send({ status: 422, msg: '非管理员账号' })
    if (!user || user.length === 0) return res.send({ status: 422, msg: '用户不存在!' })
    const isPassword = bcrypt.compareSync(password, user.getDataValue('password'))
    if (!isPassword) return res.send({ status: 422, msg: '密码错误!' })
    const token = 'Bearer ' + jwt.sign({
      id: user.getDataValue('id')
    }, secretKey, { expiresIn: 3600 * 24 * 3 })
    res.send({ status: 200, adminToken: token, msg: '登录成功,欢迎回来!' })
  })

  app.use('/admin', router)
}