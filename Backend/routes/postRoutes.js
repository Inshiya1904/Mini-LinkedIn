const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createPost, getAllPosts, getUserProfileWithPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create Post (with image upload)
router.post('/', authMiddleware, upload.single('image'), createPost);

// Get all public posts (Home Feed)
router.get('/', getAllPosts);

// Get user profile and their posts
router.get('/user/:userId', getUserProfileWithPosts);
module.exports = router;
