const { createUser } = require("../services/auth.services");
const {generateToken} = require('../services/token.services');

exports.register=async(req,res,next)=>{
    try {
const {name,email,picture,password,status} = req.body;
const newUser = await createUser({
    name,
    email,
    picture,
    password,
    status
});
const access_Token = await generateToken({userId:newUser._id},"1d",process.env.ACCESS_TOKEN_SECERT);
const refresh_Token = await generateToken({userId:newUser._id},"30d",process.env.REFRESH_TOKEN_SECERT);

// const { password: Password, ...User } = newUser;
// console.log(User)
res.cookie('refreshToken',refresh_Token,{
    httpOnly:true,
    path:'/auth/refreshToken',
    maxAge:30 * 24 * 60 * 60 * 1000, // 30 days
    



});
res.status(201).send({
    message : "registered success.",
    access_Token,
    user :{
        _id:newUser._id,
        name:newUser.name,

        email:newUser.email,
        picture:newUser.picture,
        status:newUser.status,


    }
}) 
    } catch (error) {
        next(error);
    }
}

exports.login=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}
exports.logout=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}
exports.refreshToken=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}