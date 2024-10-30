const { Model, DataTypes, Sequelize } = require('sequelize')

module.exports = (sequelize) => {
  class Post extends Model { }

  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post'
  })

  return Post
}