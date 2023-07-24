const { User } = require("../models/user_schema");

const userLogin = async(req,resp)=>{
    try{
        const username=req.body.username.toLowerCase();;
        const password=req.body.password;
        let user = await User.findOne({username:username,password:password})
        if(user){
            return resp.status(200).json(`${username} login successful`)
        }
        else{
            return resp.status(401).json('Invalid request')
        }
    }
    catch(error){
        resp.status(500).json({ message: error.message });
    }
}

const userRegistration = async(req,resp)=>{
    try{
        console.log(req.body)
        const exist = await User.findOne({username:req.body.username})
        if(exist){
            return resp.status(401).json({ message: 'User already exist'});
        }
        const user = req.body;
        user.username = user.username.toLowerCase();
        const newUser = User(user);
        newUser.save();
        resp.status(200).send("Registered Successfully");
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {userLogin,userRegistration}