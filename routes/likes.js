const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')

router.get('/', likeController.getAllLikes)

module.exports = router