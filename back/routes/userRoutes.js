const express = require('express');
const { registerUser, getAllUsers, loginUser, getUserProfile, updateUserProfile,  deleteUserProfile } = require("../controllers/userController");
const {authMiddleware} = require ('../middleware/authMiddleware');
const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users', getAllUsers);
router.post('/users/login', loginUser);
router.get('/users/Profile', authMiddleware, getUserProfile);
router.put('/users/Profile', authMiddleware, updateUserProfile);
router.delete('/users/Profile', authMiddleware, deleteUserProfile);

module.exports = router;

