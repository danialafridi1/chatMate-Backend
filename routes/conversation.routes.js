
 const express = require('express');
const trimRequest = require('trim-request');
const {authMiddleware} = require('../middlewares/auth.middleware')
const { create_open_conversation } = require('../controllers/conversation.controller');
 
 const router = express.Router();

router.post("/",trimRequest.all,authMiddleware,create_open_conversation);


 module.exports = router ;