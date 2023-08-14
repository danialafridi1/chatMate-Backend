const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/auth.controller');
const trimReq = require('trim-request')

const router = new express.Router();
router.post("/register",trimReq.all,register)
router.post("/login",trimReq.all,login)
router.post("/logout",trimReq.all,logout)
router.post("/refreshToken",trimReq.all,refreshToken)

module.exports = router;