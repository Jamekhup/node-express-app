const express = require('express');
const router = express.Router();
const {homeController} = require('../controllers/home.controller.js');
const {signupController, singupPostController, loginController, loginPostController} = require('../controllers/auth.controller.js');

router.get('/', homeController);

router.get('/signup',signupController );
router.post('/signup', singupPostController );

router.get('/login', loginController );
router.post('/login', loginPostController );


module.exports = router;