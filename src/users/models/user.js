const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (sequelize) => {
  class User extends Model {
    async isValidPassword(password) {
      return await bcrypt.compare(password, this.password)
    }
  }

  User.init({
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
    modelName: 'User'
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