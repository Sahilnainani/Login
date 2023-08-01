const express =  require('express')
const { userLogin,userRegistration, defaultPage, changePassword } = require('../controllers/user_controller')
const { checkUserAuth } = require('../middleware/auth')
const { userTask } = require('../controllers/task_controller')

const router = express.Router()

router.get('/',(req,resp)=>{
    console.log("TEMP")
    resp.send("TEMP")
})
router.use('/changepassword',checkUserAuth)
router.use('/addtask',userTask)

router.post('/login',userLogin)
router.post('/register',userRegistration)
router.post('/changepassword',changePassword)
router.post('/addtask',userTask)

router.use("*",defaultPage)

module.exports = {router}