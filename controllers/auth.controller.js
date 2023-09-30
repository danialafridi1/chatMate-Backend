const { createUser } = require("../services/auth.services");

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
// const { password: Password, ...User } = newUser;
// console.log(User)

res.status(201).send(newUser) 
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