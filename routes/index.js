const express = require('express');

const router = new express.Router();
router.get("/test",(req,res) =>{
    res.status(200).send({
        status : true,
        message : "Hello world"
    })
})

module.exports = router;