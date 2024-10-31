const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (sequelize) => {
  class User extends Model {
    async isValidPassword(password) {
      return await bcrypt.compare(password, this.password)
    }

    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' })
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  })

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds)
  })

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, saltRounds)
    }
  })

  return User
}