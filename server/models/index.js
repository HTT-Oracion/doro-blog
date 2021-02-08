// 统一管理 model，使它们在同一个sequelize中
// const { Sequelize } = require('sequelize')
const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config')
// Sequelize 实例
const connect = new Sequelize(config)
const User = require('./user')(connect, DataTypes)
const Article = require('./article')(connect, DataTypes)
const Comment = require('./comment')(connect, DataTypes)
const Tag = require('./tag')(connect, DataTypes)
const Message = require('./message')(connect, DataTypes)
/* 表之间的关系 */
User.hasMany(Article)
User.hasMany(Comment)
User.hasMany(Message)
Article.hasMany(Comment)
Article.belongsTo(User)
Comment.belongsTo(User)
Comment.belongsTo(Article)
Message.belongsTo(User)
// connect.sync({ force: true })
module.exports = {
  Sequelize,
  connect,
  User,
  Article,
  Comment,
  Message,
  Tag
}