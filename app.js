const express = require('express')
const app=express()
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',require('./routes/news'))
app.listen(port,()=> console.log('Node Server is running on Port 3000'))