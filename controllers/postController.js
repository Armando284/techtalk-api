const { Post } = require('../models')

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Error fecthing posts' })
  }
}