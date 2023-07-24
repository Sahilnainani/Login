const express =  require('express')
const { userLogin,userRegistration } = require('../controllers/user_controller')

const router = express.Router()

router.get('/',(req,resp)=>{
    resp.send("TEMP")
})
router.post('/login',userLogin)
router.post('/register',userRegistration)

module.exports = {router}