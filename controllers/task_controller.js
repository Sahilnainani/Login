const { Task } = require("../models/task_schema")
const jwt = require('jsonwebtoken')

const userTask = async(req,resp) =>{
    try{
        const {title,subtitle} = req.body
        console.log("task")
        if(title && subtitle){

            const { authorization } = req.headers
            token = authorization.split(' ')[1]
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            const newTask = new Task({
                userID:userID,
                title:title,
                subtitle:subtitle
            })
            newTask.save()
            console.log("Task added successfully",newTask)
            resp.send({ "status": "success", "message": "Task added"})

        }
        else{
            resp.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }
    catch(e){
        console.log(e.message)
        resp.send({ "status": "failed", "message": "Unable to add task" })
    }
}

module.exports = {userTask}