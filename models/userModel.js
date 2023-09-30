const mongoose = require('mongoose');
const validtor = require('validator')
const bcrypt = require('bcrypt')
const userScheme = mongoose.Schema({
name : {
    type : String,
    required : [true,"Please provide your name"]
},
email : {
    type :String,
    required : [true,"Please provide your email address"],
    unique:[true,"This email address already exist"],
    lowercase: true,
        validate :[validtor.isEmail,"Please provide valid email address"]


},
picture :{
    type : String,
    default :"https://placehold.co/150x150"
    
},
password :{
    type :String,
    required:[true ,"Please provide password for your account"],
    minLength:[6,"Please make sure your password is atleast 6 characters."],
    maxLength:[128,"Please make sure your password is less than 128 characters."],

},
status :{
    type:String,
    default : "Hey there ! I am using Chatmate "
}



},
{
    timestamps:true,
    collection : "users"
}
)

userScheme.pre('save',async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(this.password,salt);
            this.password =hashPassword;

        }
        next();
    }catch(error){next(error)}
})

const UserModel = mongoose.models.UserModel || mongoose.model("Users",userScheme);
module.exports = UserModel;