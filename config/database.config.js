const { default: mongoose } = require("mongoose");
require('dotenv').config()
const logger = require('./logger');

exports.datbaseConfig = async()=>{
    try {
        
 mongoose.connect(process.env.DBURL,{
    useNewUrlParser:true,
}).then(()=>{
logger.info("Connected to database successfully")
}) .catch((err)=>{
logger.error(err.message)
})

    } catch (error) {
        logger.error(error.message)

    }
}