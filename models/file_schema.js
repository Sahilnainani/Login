const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    userID:{
        type:String
    },
    image:
    {
        data: Buffer,
        contentType: String
    }
})

const File = mongoose.model("files",fileSchema)

module.exports = {File}