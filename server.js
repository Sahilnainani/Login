const express = require('express');
const { router } = require('./routes/route');
const { Connection } = require('./database/db');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const PORT = 4000
const app = express()
dotenv.config();
app.use(bodyParser.json({extended:true}));
app.use('/',router)

const USERNAME=process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD
const DATABASENAME=process.env.DB_DATABASENAME

Connection(USERNAME,PASSWORD,DATABASENAME)

app.listen(4000,()=>{
    console.log("Server running on PORT:",PORT);
})