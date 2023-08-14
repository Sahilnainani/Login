const express =  require('express')
const { userLogin,userRegistration, defaultPage, changePassword } = require('../controllers/user_controller')
const { checkUserAuth } = require('../middleware/auth')
const { userTask, getTasks, deleteTasks } = require('../controllers/task_controller')
const { uploadFile, upload, getFiles } = require('../controllers/file_controller')

const router = express.Router()

router.get('/',(req,resp)=>{
    console.log("TEMP")
    resp.send("TEMP")
})

// Authentication
router.use('/changepassword',checkUserAuth)
router.use('/tasks/addtask',checkUserAuth)
router.use('/tasks',checkUserAuth)
router.use('/tasks/delete/:id',checkUserAuth)
// router.use('/upload',checkUserAuth)

// Users
router.post('/login',userLogin)
router.post('/register',userRegistration)
router.post('/changepassword',changePassword)

// Tasks
router.post('/tasks/addtask',userTask)
router.get('/tasks',getTasks)
router.delete('/tasks/delete/:id',deleteTasks)

// Files
router.post('/upload', upload, uploadFile)
router.get('/files',getFiles)

// Default
router.use("*",defaultPage)

module.exports = {router}