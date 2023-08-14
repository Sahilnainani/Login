const multer = require('multer')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { Filee } = require('../models/file_schema')
const bson = require('bson')

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"./uploads")
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("user_file")

const uploadFile = async(req,resp) => {
    try{
        var upload_file = fs.readFileSync(req.file.path)

        const { authorization } = req.headers
        token = authorization.split(' ')[1]
        const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const newFile = new Filee({
            userID:userID,
            image:{
                data:upload_file,
                contentType:req.file.mimetype
            }
        })
        newFile.save();
        console.log(upload_file)
        resp.send("File Uploaded")
    }
    catch(e){
        console.log("Error:",e.message)
    }
}   

const getFiles = async(req,resp) => {
    const data = await Filee.find()
    const cur = JSON.stringify(data)
    console.log(cur)
    resp.send(cur)
    // resp.render('page', {
    //     image: data.toString('base64')
    //   })
}   

module.exports = {uploadFile,upload,getFiles}