const createHttpError = require("http-errors");
const { ConversationModel, UserModel } = require("../models")
const logger = require('../config/logger');


exports.doesConversationExist = async(sender_id,receiver_id)=>{
let convos = await ConversationModel.find({
    isGroup : false,
    $and:[
        { users: { $elemMatch: { $eq:sender_id } } },
         { users: { $elemMatch: { $eq:receiver_id } } }
    ]

})
.populate("users",'-password')

.populate("latestMessage");

if(!convos){
    
    throw createHttpError.BadRequest("Oops... Something went wrong")
}

// populate message model
convos = await UserModel.populate(convos,{
    path: "latestMessage.sender",
    select: "name email picture status" ,
});

return convos[0]

}

exports.createConversation = async(data)=>{
const newConversation = await ConversationModel.create(data);
if(!newConversation){
    throw createHttpError.BadRequest("Oops... Something went wrong")
}
return newConversation
}

exports.popluateConversation = async(id,fieldToPopulate,fiedlToRemove)=>{
    const populateConvo = await ConversationModel.findOne({_id:id})
    .populate(fieldToPopulate,
        fiedlToRemove);
        if(!populateConvo){
            throw createHttpError.BadRequest("Oops... Something went wrong")
        }
         return populateConvo;
}
exports.getuserConversations = async(user_id)=>{
    let conversations; 
     await ConversationModel.find({
        users :{
            $elemMatch : {$eq:user_id}
        },

    })
    .populate("users","-password")
    .populate("admin","-password")
    .populate("latestMessage")
    .sort({updateAt:-1})
    .then(async(result)=>{
        result = await UserModel.populate(result,{
            path: "latestMessage.sender",
            select: "name email picture status" ,
        });
        conversations = result;
    }).catch((err)=>{
        logger.error(err);
        throw createHttpError.BadRequest("Oops... Something went wrong") 
    });

    return conversations;
}
exports.updateLatestMessage = async(id,msg)=>{
    const updateConvo = await ConversationModel.findByIdAndUpdate(id,{
        latestMessage:msg
    });
    if(!updateConvo){
        throw createHttpError.BadRequest("Oops... Something went wrong") 
    }
     return updateConvo;
}