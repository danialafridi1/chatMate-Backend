const express = require('express');
const router = new express.Router();
router.get("/",(req,res) =>{
    res.status(200).json({
        status : true,
        message : "Hello world"
    })
})

module.exports = router;