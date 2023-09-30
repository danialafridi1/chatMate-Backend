
const jwt = require('jsonwebtoken');
const logger = require('../config/logger')

exports.sign = async(payload,expireIn,secert)=>{
    return new Promise((resolve,reject)=>{
        return jwt.sign(payload,secert,{
            expiresIn:expireIn, 
        },(error,token)=>{
            if(error){
                logger.error(error)
                reject(error)
            } else {
                resolve(token);
            }
        })
    })
}