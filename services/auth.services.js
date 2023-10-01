const createHttpError = require("http-errors");
const validator = require('validator');
const {UserModel} = require('../models/index');
const bcrypt = require('bcrypt')

exports.createUser = async(userData)=>{
    const {name,email,picture,password,status} = userData;
    if(!name || !email || !password){
        throw createHttpError.BadRequest("Please fill all fields.");
    
}

if(!validator.isLength(name,{
    min:2,
    max:16
})){
    throw createHttpError.BadRequest("Please make sure your name between 2 and 16 characters.");

}

if(status && status.length >64){
    
        throw createHttpError.BadRequest("Please make sure your status less than 64 characters.");
 
    
}

if(!validator.isEmail(email)){
    throw createHttpError.BadRequest("Please make sure to provide valid email address");

}


// check if user already exit

const checkDublicateEmail = await UserModel.findOne({email});
if(checkDublicateEmail){
    throw createHttpError.Conflict("Please try again with different email address,this email already exist");

}

// check for password
if(!validator.isLength(password,{
    min: 6,
    max:128
})){
    throw createHttpError.BadRequest("Please make sure your password between 6 and 128 characters.");

}



// hashpassword using bcrypt

const user =await new UserModel({
    name,
    email,
    picture,
    password,
    status
}).save();
return user;

};

exports.signUser = async(email,password)=>{

const user = await UserModel.findOne({email:email.toLowerCase()}).lean();
if(!user){
    throw createHttpError.NotFound("Invalid Credentials")
}
//compare password
let passwordMatches =  await bcrypt.compare(password,user.password);
if(!passwordMatches){
    throw createHttpError.NotFound("Invalid Credentials")
  
}
return user;



}