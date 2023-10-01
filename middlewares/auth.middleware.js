const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');


exports.authMiddleware =async function (req,res,next){
if(!req.headers['authorization']){
    return next(createHttpError.Unauthorized())
}
const bearertoken = req.headers['authorization'];
const token = bearertoken.split(' ')[1];
jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(error,payload)=>{
    if(error){
       
        return next(createHttpError.Unauthorized());
    } 
    req.user= payload;
    next();
});



}