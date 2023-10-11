const { default: mongoose } = require("mongoose");
const  { ObjectId} = mongoose.Schema.Types;

const messageScheme = mongoose.Schema({
sender :{
    type: ObjectId,
    ref : "UserModel"
},
message : {
    type :String,
    trim:true
},
conversation:{
    type : ObjectId,
    ref :"ConversationModel"
},
files: [],



},{
    collection: "messages",
    timestamps:true
})
const MessageModel = mongoose.models.MessageModel || mongoose.model("MessageModel",messageScheme);
module.exports = MessageModel;