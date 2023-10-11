const express = require('express');
const authRoute = require('./auth.routes');
const trimReq = require('trim-request')
const {authMiddleware} = require('../middlewares/auth.middleware')
const conversationRoute = require('./conversation.routes');
const messageRoute = require('./message.route');

const router = new express.Router();
router.use("/auth",authRoute);
router.use("/conversation",conversationRoute);

router.use("/message",messageRoute);


module.exports = router;