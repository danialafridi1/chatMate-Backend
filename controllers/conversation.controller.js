const createHttpError = require("http-errors");
const { doesConversationExist, createConversation, popluateConversation } = require("../services/conversation.services");
const { findUser } = require("../services/user.services");

exports.create_open_conversation = async (req,res,next)=>{

try {
    const sender_id = req.user.userId;
    const {receiver_id} = req.body;
    
// check if receiver_id is not null otherwise throw error
if(!receiver_id){
    throw createHttpError.BadGateway("Something went wrong");
}

// check if chat already exist
const existed_conversation = await doesConversationExist(sender_id,receiver_id);
if(existed_conversation){
    res.status(200).json(existed_conversation)
} else {
    let receiverUser = await findUser(receiver_id);
    let convoData = {
        name:receiverUser.name,
        isGroup : false,
        users:[
            sender_id,receiver_id
        ],
        
    }
    const newConversation = await createConversation(convoData);
    // populated conversation mean adding whole information of sender and receiver except password
    const populatedConversation = await popluateConversation(newConversation._id,"users","-password")
    res.status(200).json(populatedConversation)
}
   
} catch (error) {
    // console.log(error.message)
    next(error);
}

}