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
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))