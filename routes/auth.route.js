const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers/admin.controller.js');
const {logoutController} = require('../controllers/auth.controller.js');

router.get('/dashboard', adminController);
router.get('/logout', logoutController);


module.exports = router;