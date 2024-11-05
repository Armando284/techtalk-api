const { User } = require('../models')
const Validation = require('../utils/validation')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' })
  }
}

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    Validation.name(name)
    Validation.email(email)
    Validation.password(password)

    const user = await User.findOne({ where: { email } })
    if (user !== null) throw new Error('Email already exists!')

    const newUser = await User.create({
      name,
      email,
      password
    })

    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

exports.loginUser = async (req, res) => {
  const { name, password } = req.body

  try {
    Validation.name(name)
    Validation.password(password)

    const user = await User.findOne({ where: { name } })
    if (user === null) throw new Error('User not found!')

    const isPassword = await User.isPassword({ user, password })
    if (!isPassword) throw new Error('Wrong password!')

    const token = jwt.sign(
      { id: user.id, name: user.name },
      config.jwtSecretKey,
      {
        expiresIn: '1h'
      }
    )
    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    res
      .cookie('access_tokken', token, {
        httpOnly: true, // solo se puede acceder la 🍪 en el servidor
        secure: process.env.NODE_ENV === 'production', // en produccion solo se puede acceder por https
        sameSite: 'strict', // solo se puede acceder desde el mismo dominio, evita cross origin forgery
        maxAge: 60 * 60 * 1000 // la cookie solo vive 1h
      })
      .json(publicUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.error(error.message)
  }

}

exports.updateUser = async (req, res) => {
  const token = req.cookies.access_tokken
  const { name, email, password } = req.body
  console.log({ name, email, password });


  try {
    if (token == null) {
      throw new Error('Access not authorized!')
    }
    const data = jwt.verify(token, config.jwtSecretKey)
    if (data?.id == null) {
      throw new Error('Wrong access token format!')
    }

    const myUser = await User.findOne({ where: { id: data.id } }) // Make sure is the same user on the token, can this create issues 🤔
    await myUser.update({ name, email, password })

    const publicUser = {
      id: myUser.id,
      name: myUser.name,
      email: myUser.email
    }

    res.json(publicUser)

  } catch (error) {
    console.error(error.message)
    res.status(403).json({ error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  const token = req.cookies.access_tokken

  try {
    if (token == null) {
      throw new Error('Access not authorized!')
    }
    const data = jwt.verify(token, config.jwtSecretKey)
    if (data?.id == null) {
      throw new Error('Wrong access token format!')
    }
    await User.destroy({ where: { id: data.id } })
    res.clearCookie('access_token')
    res.json('User deleted!')
  } catch (error) {
    console.error(error.message)
    res.status(403).json({ error: error.message })
  }

}