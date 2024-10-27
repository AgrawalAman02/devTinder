require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userAuth = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token) throw new Error("token not found");
        const decodedMessage = await jwt.verify(token,JWT_SECRET_KEY);
        const {id} = decodedMessage;

        const user = await User.findById(id);
        if(!user) throw new Error("user not found");

        req.user = user;
        next();
        
    }catch(err){
        res.status(401).send("ERROR: "+ err.message);
    }
}

module.exports = {
    userAuth,
}