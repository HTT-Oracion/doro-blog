module.exports = app => {
  const {
    Sequelize,
    connect,
    User,
    Article,
    Tag,
    Comment,
    Message
  } = require('../../models')
  const Op = Sequelize.Op
  const router = require('express').Router()
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')
  const secretKey = require('../../key')
  connect.sync()
  // test
  router.get('/test', async (req, res) => {
    const articleList = await Article.findAll({
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      }]
    })
    res.send(articleList)
  })
  // 最新评论
  router.get('/comments/newest', async (req, res) => {
    const commentList = await Comment.findAll({
      order: ['date']
    })
    res.send({ status: 200, msg: '获取最新评论成功', result: commentList })
  })
  // 获取文章评论
  router.get('/article/:id/comments', async (req, res) => {
    const commentList = await Comment.findAll({
      where: { articleId: req.params.id }
    })
    return res.send({ status: 200, msg: '获取评论列表成功', result: commentList })
  })
  // 添加文章评论
  router.post('/article/:id/comments', async (req, res) => {
    const uid = require('../../utils/getCurrentId')(req, res)
    const comment = await Comment.create({
      ...req.body,
      articleId: req.params.id,
      userId: uid
    })
    if (comment) return res.send({ status: 200, msg: '添加评论成功!' })
  })
  // 获取所有留言
  router.get('/messages', async (req, res) => {
    const messageList = await Message.findAll()
    res.send({ status: 200, msg: '获取评论列表成功', result: messageList })
  })
  // 发布留言
  router.post('/add/messages', async (req, res) => {
    console.log(req.body);
    const uid = require('../../utils/getCurrentId')(req, res)
    const message = await Message.create({
      ...req.body,
      userId: uid
    })
    if (message) return res.send({ status: 201, msg: '添加留言成功！' })
    // const comment = await Comment.create({})
  })
  // 获取所有文章 // 查询分页
  router.get('/articles', async (req, res) => {
    const query = req.query.query,
      pageNum = parseInt(req.query.pageNum) || 1,
      pageSize = parseInt(req.query.pageSize) || 5
    // console.log(query, pageNum, pageSize);
    let whereObj = {
      [Op.or]: [
        { title: { [Op.like]: '%' + query + '%' } },
        { introduction: { [Op.like]: '%' + query + '%' } },
        { tags: { [Op.like]: '%' + query + '%' } }
      ]
    }
    // 搜索总数
    let totalArticle = 0
    // 文章列表
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
    /* 
    if(query && query !== '') {
    const articles = await Article.findAll({
      raw: true,
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + query + '%' } },
          { introduction: { [Op.like]: '%' + query + '%' } },
          { tags: { [Op.like]: '%' + query + '%' } }
        ]
      }
    })
  }else {
    const articles = await Article.findAll({
     raw: true,
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + query + '%' } },
          { introduction: { [Op.like]: '%' + query + '%' } },
          { tags: { [Op.like]: '%' + query + '%' } }
        ]
      }
    })
  }
    
    */
    if (!articles || articles.length === 0) return res.send({ status: 422, msg: '没有任何文章!' })
    res.send({ status: 200, msg: `获取文章列表成功,共${totalArticle}篇文章`, result: articles, total: totalArticle })
  })
  // 随机文章 默认为5篇
  router.get('/some/articles', async (req, res) => {
    const randArticles = await Article.findAll({
      order: connect.random(),
      limit: 5
    })
    res.send({ status: 200, result: randArticles })
  })
  // 最新文章
  router.get('/articles/newest', async (req, res) => {
    const articles = await Article.findAll({
      limit: 5
    })
    return res.send({ status: 200, msg: '获取最新文章成功', result: articles })
  })
  // 获取文章详情
  router.get('/article/:id', async (req, res) => {
    const article = await Article.findOne({ where: { id: req.params.id } })
    res.send(article)
  })
  // 搜索文章：
  router.get('/search', async (req, res) => {
    const key = req.query.key
    const articles = await Article.findAll({
      raw: true,
      where: {
        [Op.or]: [
          { title: { [Op.like]: '%' + key + '%' } },
          { introduction: { [Op.like]: '%' + key + '%' } },
          { tags: { [Op.like]: '%' + key + '%' } }
        ]
      }
    })
    if (!articles || articles.length === 0) return res.send({ status: 422, msg: '没有搜索到相关内容!' })
    return res.send({
      status: 200,
      msg: `查询到${articles.length}条结果`,
      data: articles
    })
  })
  // 获取所有标签
  router.get('/tags', async (req, res) => {
    const tags = await Tag.findAll()
    if (!tags || tags.length === 0) return res.send({ status: 422, msg: '标签列表为空!' })
    return res.send({ status: 200, msg: '获取标签列表成功!', result: tags })
  })
  // 获取用户
  router.get('/user/:id', async (req, res) => {
    console.log(req.params.id);
    const user = await User.findOne({
      where: { id: req.params.id }
    })
    if (user) res.send({ status: 200, msg: '获取用户信息成功', result: user })
  })
  // 登录
  router.post('/user/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user || user.length === 0) return res.send({ status: 422, msg: '用户不存在!' })
    const isPassword = bcrypt.compareSync(password, user.getDataValue('password'))
    if (!isPassword) return res.send({ status: 422, msg: '密码错误!' })
    const token = 'Bearer ' + jwt.sign({
      id: user.getDataValue('id')
    }, secretKey, { expiresIn: 3600 * 24 * 3 })
    res.send({ status: 200, token: token, msg: '登录成功,欢迎回来!' })
  })
  // 注册
  router.post('/user/register', async (req, res) => {
    const { id, username, password, mobile, email } = req.body
    const user = await User.findOne({
      where: { username, mobile: String(mobile) }
    })
    if (user) {
      return res.send({ status: 422, msg: '用户名或手机号码已存在!' })
    } else {
      const newUser = await User.create({
        id,
        username,
        password: bcrypt.hashSync(password, 10),
        mobile: String(mobile),
        email
      })
      res.send({ status: 201, msg: '创建成功!' })
    }
  })
  app.use('/web', router)
}