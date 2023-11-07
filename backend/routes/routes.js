const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// Register User
router.post('/register', controller.register);

// User Login
router.post('/login', controller.login);

// Create a Post
router.post('/posts', controller.createPost);

// Update a Post
router.put('/posts/:id', controller.updatePost);

// Get All Posts
router.get('/posts', controller.getAllPosts);

// Get All Users
router.get('/allUsers', controller.getAllUsers);

// Follow/Unfollow User
router.post('/followUnfollow', controller.followUnfollow);

// Send a Message
router.post('/messages', controller.sendMessage);

// Get Messages between Users
router.get('/messages/:userId1/:userId2', controller.getMessages);

module.exports = router;
