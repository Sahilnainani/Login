const express =  require('express')
const { userLogin,userRegistration, defaultPage, changePassword } = require('../controllers/user_controller')
const { checkUserAuth } = require('../middleware/auth')
const { userTask, getTasks } = require('../controllers/task_controller')

const router = express.Router()

router.get('/',(req,resp)=>{
    console.log("TEMP")
    resp.send("TEMP")
})
router.use('/changepassword',checkUserAuth)
router.use('/addtask',checkUserAuth)
// router.use('/tasks',checkUserAuth)

router.post('/login',userLogin)
router.post('/register',userRegistration)
router.post('/changepassword',changePassword)
router.post('/addtask',userTask)

router.get('/tasks',getTasks)

router.use("*",defaultPage)

module.exports = {router}