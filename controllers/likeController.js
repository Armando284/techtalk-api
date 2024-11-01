const { Like } = require('../models')

exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll()
    res.json(likes)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching likes' })
  }
}