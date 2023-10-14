const createHttpError = require("http-errors");
const { searchUserByKeyword } = require("../services/user.services");


exports.searchUser = async(req,res,next)=>{
   try {
const keyword = req.query.search;
console.log(keyword)
if(!keyword){
  throw  createHttpError.BadRequest("Oops... something went wrong");
    
}
const users = await searchUserByKeyword(keyword);

res.status(200).json(users);
    
   } catch (error) {
    next(error);
   }
}