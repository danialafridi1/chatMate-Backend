const {sign,verify} = require('../utils/token.utils')
exports.generateToken=  async (payload,expireIn,secert)=>{
let token = await sign(payload,expireIn,secert);
return token;
}
exports.verifyToken = async (token,secert)=>{
    let check = await verify(token,secert);
    return check;
}
