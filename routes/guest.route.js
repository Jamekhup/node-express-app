const express = require('express');
const router = express.Router();
const {homeController} = require('../controllers/home.controller.js');
const {signupController, singupPostController, loginController, loginPostController} = require('../controllers/auth.controller.js');
const {checkIfAuth} = require('../middleware/GuestMiddleware');
const {postController} = require('../controllers/post.controller.js');

router.get('/', homeController);

router.get('/posts', postController);

router.get('/signup',checkIfAuth,signupController );
router.post('/signup', singupPostController );

router.get('/login',checkIfAuth,loginController );
router.post('/login', loginPostController );


module.exports = router;