const express = require('express')
const app = express()
const routes = require('./routes');
require('dotenv').config();

app.use(routes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))