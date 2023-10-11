const MessageModel = require("../models/messageModel")

exports.createMessage = async(data)=>{
    
    let newMessage = await MessageModel.create(data);
    if(!newMessage){
        throw createHttpError.BadRequest("Oops...Something went wrong. we cant able to send a message ")
    }
    return newMessage;
}
exports.populateMessage = async(id)=>{

let msg = await MessageModel.findById(id)
 .populate({
    path: "sender",
    select: "name  picture" ,
    model: "UserModel",
 })
 .populate({
    path: "conversation",
    select: "name  isGroup,users" ,
    model: "ConversationModel",
    populate :{
        path : "users",
        select: "name email picture status" ,
        model: "UserModel"
    }
 })
 if(!msg){
    throw createHttpError.BadRequest("Oops... Something went wrong")
}
return msg
};

exports.getConvoMessage = async(convo_id)=>{
    const messages = await MessageModel.find({
        conversation : convo_id
    })
    .populate("sender","name email picture status")
    .populate("conversation");
    if(!messages){
        throw createHttpError.BadRequest("Oops... Something went wrong")
    }

    return messages;
}