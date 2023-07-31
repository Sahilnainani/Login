const express =  require('express')
const { userLogin,userRegistration, defaultPage, changePassword } = require('../controllers/user_controller')
const { checkUserAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/',(req,resp)=>{
    console.log("TEMP")
    resp.send("TEMP")
})
router.use('/changepassword',checkUserAuth)

router.post('/login',userLogin)
router.post('/register',userRegistration)
router.post('/changepassword',changePassword)

router.use("*",defaultPage)

module.exports = {router}