const {sign} = require('../utils/token.utils')
exports.generateToken=  async (payload,expireIn,secert)=>{
let token = await sign(payload,expireIn,secert);
return token;
}
