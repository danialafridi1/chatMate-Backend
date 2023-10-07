const createHttpError = require("http-errors");
const { createUser,signUser } = require("../services/auth.services");
const {generateToken,verifyToken} = require('../services/token.services');
const { findUser } = require("../services/user.services");

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
    
    user :{
        _id:newUser._id,
        name:newUser.name,

        email:newUser.email,
        picture:newUser.picture,
        status:newUser.status,
        token:access_Token


    }
}) 
    } catch (error) {
        next(error);
    }
}

exports.login=async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user =  await signUser(email,password);
        const access_Token = await generateToken({userId:user._id},"1d",process.env.ACCESS_TOKEN_SECERT);
const refresh_Token = await generateToken({userId:user._id},"30d",process.env.REFRESH_TOKEN_SECERT);
res.cookie('refreshToken',refresh_Token,{
    httpOnly:true,
    path:'/auth/refreshToken',
    maxAge:30 * 24 * 60 * 60 * 1000, // 30 days
    



});
res.status(200).send({
    message : "login success.",
   
    user :{
        _id:user._id,
        name:user.name,

        email:user.email,
        picture:user.picture,
        status:user.status,
        token:access_Token


    }
})
    } catch (error) {
        next(error);
    }
}
exports.logout=async(req,res,next)=>{
    try {
        res.clearCookie('refreshToken',{
            path:'/auth/refreshToken'
        });
        res.status(200).send({
            message : "logged out!"
        })
        
    } catch (error) {
        next(error);
    }
}
exports.refreshToken=async(req,res,next)=>{
    try {
        const refresh_Token = req.cookies.refreshToken;
        if(!refresh_Token){
            throw createHttpError.Unauthorized("Please Login.");
        }

        
        const check = await verifyToken(refresh_Token,process.env.REFRESH_TOKEN_SECERT);
        const user = await findUser(check.userId);

        const access_Token = await generateToken({userId:user._id},"1d",process.env.ACCESS_TOKEN_SECERT);


        res.status(200).send({
           
            
            user :{
                _id:user._id,
                name:user.name,
        
                email:user.email,
                picture:user.picture,
                status:user.status,
                token:access_Token
        
        
            }
        })
    } catch (error) {
        next(error);
    }
}