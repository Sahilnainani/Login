const { Task } = require("../models/task_schema")
const jwt = require('jsonwebtoken')

const userTask = async (req, resp) => {
    try {
        const { title, subtitle } = req.body
        if (title && subtitle) {

            const { authorization } = req.headers
            token = authorization.split(' ')[1]
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            const newTask = new Task({
                userID: userID,
                title: title,
                subtitle: subtitle
            })
            newTask.save()
            console.log("Task added successfully", newTask)
            resp.send({ "status": "success", "message": "Task added" })

        }
        else {
            resp.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }
    catch (e) {
        console.log(e.message)
        resp.send({ "status": "failed", "message": "Unable to add task" })
    }
}

const getTasks = async (req, resp) => {
    try {
        const pageSize = parseInt(req.query.size) | 5
        const pageNumber = parseInt(req.query.page) | 1

        const { authorization } = req.headers
        token = authorization.split(' ')[1]
        const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const skipDocuments = (pageNumber - 1) * pageSize;

        const userTasks = await Task.find(
            { userID: userID },
            { title: 1, subtitle: 1 },
            { skip: skipDocuments, limit: pageSize }
        )
        resp.send(userTasks)
    }
    catch (e) {
        resp.send(e.message)
    }
}

const deleteTasks = async(req,resp) =>{
    try{
        const ID = req.params.id
        console.log(ID)
        const result = await Task.deleteOne({_id:ID})
        resp.send(result)
    }
    catch(e){
        resp.send(e.message)
    }
}
module.exports = { userTask, getTasks, deleteTasks }
