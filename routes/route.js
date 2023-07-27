const express =  require('express')
const { userLogin,userRegistration, defaultPage } = require('../controllers/user_controller')

const router = express.Router()

router.get('/',(req,resp)=>{
    resp.send("TEMP")
})
router.post('/login',userLogin)
router.post('/register',userRegistration)
router.use("*",defaultPage)

module.exports = {router}