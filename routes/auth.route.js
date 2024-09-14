const express = require('express');
const router = express.Router();
const {postController} = require('../controllers/post.controller.js');
const {logoutController} = require('../controllers/auth.controller.js');

router.get('/dashboard', postController);
router.get('/logout', logoutController);


module.exports = router;