const express = require('express');
const trimReq = require('trim-request');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { searchUser } = require('../controllers/user.controller');

const router = new express.Router();
router.get('/',trimReq.all,authMiddleware,searchUser);

module.exports = router;