const multer = require('multer')

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"D:/HOW/log_in/Node_login/node_login/controllers/uploads")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file")

const uploadFile = async(req,resp) => {
    console.log("OP")
    console.log(req.body)
    resp.send("Upload File")
}   

module.exports = {uploadFile,upload}