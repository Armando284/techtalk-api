const { Comment } = require('../models')

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.json(comments)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' })
  }
}