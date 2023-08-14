const express = require('express');
const authRoute = require('./auth.routes');
const trimReq = require('trim-request')

const router = new express.Router();
router.use("/auth",authRoute);
router.get("/",trimReq.all,(req,res) =>{
    res.status(200).send({
        message : "Hello Welcome to ChatMate"
    })
})

module.exports = router;