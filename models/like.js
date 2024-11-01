const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  }

  Like.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    likeable_type: { // post || comment
      type: DataTypes.STRING(50),
      allowNull: false
    },
    likeable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true,
    initialAutoIncrement: 1
  })
}