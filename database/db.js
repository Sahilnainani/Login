const mongoose = require('mongoose')

const Connection = async(username,password,databaseName)=>{
    const url = `mongodb+srv://${username}:${password}@cluster0.tqffrlw.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(url)
        console.log("Database Connected")
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {Connection}