const express = require('express')
require('dotenv').config();
const routes = require('./routes');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSenitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compresion = require('compression');
const fileupload = require('express-fileupload');
const cors = require('cors');
const logger = require('./config/logger');
const createhttprouteError = require('http-errors');
const { default: mongoose } = require('mongoose');
require('./config/database.config').datbaseConfig()

const app = express()


// using morgan middleware
if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}

// adding helmet 
app.use(helmet());
// parser json
app.use(express.json());
// parser url
app.use(express.urlencoded({extended : true}));
// use mongo sanitize 
app.use(mongoSenitize());
// enable cookie parser
app.use(cookieParser())
// enable data body compression
app.use(compresion());
// fileupload
app.use(fileupload({
    useTempFiles : true
}));
const allowedOrigins = [
    "http://192.168.10.3:3000",
    "http://localhost:3000", 
    
  ];
// useing cors
app.use(cors(
    {
        origin : allowedOrigins
    }
))

// implement routes 
app.use(routes);

// error handler
app.use(async (req, res, next) => {
    next(createhttprouteError.NotFound("This route does not exit."));
});

app.use(async (err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: {status :err.status || 500,
        message:errorMessage} });
});
const PORT = process.env.PORT || 4000;
let server;
server=app.listen(PORT, () => {
    logger.info(`server is listening at ${PORT}...!`);
  
})

// unhandle uncaugh error
const exitHandler =()=>{
    if (server) {
        logger.info("Server is closed");
        process.exit(1)
    } else {
        process.exit(1)
    }
}
const unExpectedErrorHandler=(error)=>{
    logger.error(error)
    exitHandler();
    
}
process.on("uncaughtException",unExpectedErrorHandler);
process.on("unhandledRejection",unExpectedErrorHandler);
process.on("SIGTERM",()=>{
    if (server) {
        logger.info("Server is closed");
        process.exit(1)
    } 
})

mongoose.connection.on('error',(err)=>{
    logger.error(`MongoDb connection error ${err}`)
    process.exit(1)

})

if (process.env.NODE_ENV !== "production") {
    mongoose.set('debug',true);
}