const mongoose = require("mongoose");
const  { ObjectId} = mongoose.Schema.Types;
const ConversationScheme = mongoose.Schema({
    name :{
        type : String,
        required : [true, "Conversation  is required"],
        trim: true

    },
    picture : {
        type: String,
        required : [true,"Picture is required"],
        

    },
    isGroup :{
        type : Boolean,
        required : true,
        default : false,
    },
    users : [
        {
            type : ObjectId,
            ref : "UserModel",

        },
    ],
        latestMessage: {
            type : ObjectId,
            ref : "MessageModel",
        },
        admin : {
            type : ObjectId,
            ref : "UserModel"
        },
        
    
},
{
    collection : 'conversations',
    timestamps : true
}
);

const ConversationModel = mongoose.models.ConversationModel || mongoose.model("ConversationModel",ConversationScheme);
module.exports = ConversationModel;