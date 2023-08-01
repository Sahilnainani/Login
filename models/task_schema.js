const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userID:{
        type:String
    },
    title:{
        type:String
    },
    subtitle:{
        type:String
    }
})

const Task = mongoose.model('tasks',taskSchema)

module.exports = {Task}