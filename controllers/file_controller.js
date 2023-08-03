const { Task } = require("../models/task_schema")


const uploadFile = async(req,resp) => {
    resp.send("Upload File")
}   

module.exports = {uploadFile}