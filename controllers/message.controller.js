const createHttpError = require("http-errors");
const logger = require("../config/logger");
const { createMessage, populateMessage, getConvoMessage } = require("../services/message.services");
const { updateLatestMessage } = require("../services/conversation.services");


exports.sendMessage =async(req,res,next)=>{
    try {

        const user_id = req.user.userId;
    //     if(!user_id){
    //      throw createHttpError.BadGateway("you need to login first");
    //  }
     const {message,convo_id,files } = req.body;
     if(!convo_id || (!message && !files)){
logger.error("please provide conversation id or Message body");
return res.sendStatus((400));
     }
let messageData = {
    sender:user_id,
    message,
    conversation:convo_id,
    files :files || [],
};
let newMessage = await createMessage(messageData);
let populateMessages = await populateMessage(newMessage._id);
await updateLatestMessage(convo_id,newMessage); 

res.status(201).json(populateMessages);




    } catch (error) {
       
        next(error)
    }
}
exports.getMessage = async(req,res,next)=>{
    try {
     const convo_id = req.params.convo_id;
     if(!convo_id){
       return sendStatus(400);
    }
    const messages = await getConvoMessage(convo_id);
    res.status(200).json(messages);

    } catch (error) {
        next(error)
    }
}