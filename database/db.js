const mongoose = require('mongoose')

const Connection = async(username,password,databaseName)=>{
    const url = `mongodb+srv://sahil:sahil@cluster0.tqffrlw.mongodb.net/bhairavasoft?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(url)
        console.log("Database Connected")
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {Connection}