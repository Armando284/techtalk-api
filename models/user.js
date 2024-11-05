const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = (sequelize) => {
  class User extends Model {
    static async isPassword({ user, password }) {
      return await bcrypt.compare(password, user.password)
    }

    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' })
      this.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' })
      this.hasMany(models.Like, { foreignKey: 'userId', as: 'likes' })
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
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        len: [3, 16],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [3, 64],
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 64],
      }
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    initialAutoIncrement: 1
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