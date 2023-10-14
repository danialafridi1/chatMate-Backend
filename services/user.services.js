const createHttpError = require("http-errors");
const { UserModel } = require("../models")

exports.findUser = async(userId)=>{
  const user = await UserModel.findById(userId);
  if(!user){
    throw createHttpError.BadRequest("Please fill all fields.");
  }  
   return user;

}

exports.searchUserByKeyword = async(keyword)=>{
const users = await UserModel.find(
  {
    $or:[
      {
        name:{
          $regex:keyword,
          $options: "i"
        }
      },
      {
        email:{
          $regex:keyword,
          $options: "i"
        }
      }
    ]
  },
  {
    // Specify the fields to include in the results
    _id: 1, // Include the user's ID
    name: 1, // Include the user's name
    email: 1, // Include the user's email
    picture :1,
    status:1,
    createdAt:1,
    updatedAt:1
    
  }
)
return users;
}

