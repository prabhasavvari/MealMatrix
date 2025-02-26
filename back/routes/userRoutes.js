const express = require('express');
const { registerUser, getAllUsers, loginUser, updateUser } = require("../controllers/userController");
const {authMiddleware} = require ('../middleware/authMiddleware');
const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users', getAllUsers);
router.post('/users/login', loginUser);
router.put('/users/updateProfile', authMiddleware, updateUser);

module.exports = router;

