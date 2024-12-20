const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.getAllUsers);

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router;
