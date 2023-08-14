const express = require('express');
const createhttprouteError = require('http-errors');

const router = new express.Router();
router.get("/test",(req,res) =>{
    throw createhttprouteError.BadRequest("Bad Request");
})

module.exports = router;