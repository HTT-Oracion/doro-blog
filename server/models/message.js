module.exports = (sequelize, DataTypes) => {
  return sequelize.define('message', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.STRING
    }
  })
}
