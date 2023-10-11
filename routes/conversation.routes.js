
 const express = require('express');
const trimRequest = require('trim-request');
const {authMiddleware} = require('../middlewares/auth.middleware')
const { create_open_conversation,getConversations } = require('../controllers/conversation.controller');
 
 const router = express.Router();

router.post("/",trimRequest.all,authMiddleware,create_open_conversation);
router.get("/",trimRequest.all,authMiddleware,getConversations);


 module.exports = router ;