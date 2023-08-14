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
const logger = require('./configs/logger');
const createhttprouteError = require('http-errors');

const app = express()


// using morgan middleware
if (process.env.NODE_ENV !== "production") {
    app.use(morgan('combined'));
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
// useing cors
app.use(cors(
    {
        origin : "http://localhost:3000"
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