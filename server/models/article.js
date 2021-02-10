module.exports = (sequelize, DataTypes) => {
  return sequelize.define('article', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 简介
    introduction: {
      type: DataTypes.STRING
    },
    // 封面
    cover: {
      type: DataTypes.TEXT
    },
    // 内容 markdown
    body: {
      type: DataTypes.STRING
    },
    // 内容 html
    content: {
      type: DataTypes.TEXT
    },
    // 标签列表
    tags: {
      type: DataTypes.STRING,
      get () {
        return this.getDataValue('tags').split(',')
      },
      set (val) {
        this.setDataValue('tags', val)
      }
    },
    click: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Doro'
    },
    date: {
      type: DataTypes.STRING
    }
  })
}