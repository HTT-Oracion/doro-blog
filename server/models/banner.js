module.exports = (sequelize, DataTypes) => {
  return sequelize.define('banner', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
    }
  })
}