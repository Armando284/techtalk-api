const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      this.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' })
    }
  }

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true,
    initialAutoIncrement: 1
  })

  return Comment
}