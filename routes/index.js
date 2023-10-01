const express = require('express');
const authRoute = require('./auth.routes');
const trimReq = require('trim-request')
const {authMiddleware} = require('../middlewares/auth.middleware')

const router = new express.Router();
router.use("/auth",authRoute);
router.get("/",trimReq.all,authMiddleware,(req,res) =>{
    res.status(200).send({
        message : req.user
    })
})

module.exports = router;