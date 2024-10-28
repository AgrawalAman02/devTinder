const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");


// API for signup (using POST HTTP method to add a new user)
router.post("/signup", async (req,res)=>{
    try{
        //  validation of the data
        validateSignUp(req);

        // encryption of password 
        const {firstName, lastName, emailId, password} = req.body;

        const hashPassword = await bcrypt.hash(password,10); // 10 round salting is enough

        // console.log(req) gives a whole req but we get the data from the endpoit in readable format and the data is present in the body 
        // Creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password : hashPassword,
        });  // makes the data dynamic by passing data from request 

        await user.save()
        res.send("User Added Successfully...");
      
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
        console.log(err);
        };
// we can use try and catch block
});

router.post("/login", async (req,res)=>{
    
    try{
        const {emailId, password} = req.body;
        // we need to check whether the email id is valid or not . we dont have to check for the password during login
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Credentials...");
        }
        const user= await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("User not Exist...");
        }
        // console.log(user);
        // console.log(password,user.password);
        const isMatchedPassword = await user.validatePassword(password);
        // console.log(isMatchedPassword);

        if(isMatchedPassword){
            // we will add the logic of authentication , token  & cookies here 

            // 1> Create a JWT Token 
            const token = await user.getJWT();
            // 2> Add the token to the cookie and send the response back to the user
            res.cookie("token", token,{
                expires : new Date(Date.now() + 8*3600000),
            });

            res.send("Login successful...");
        }else{  
            throw new Error("Login failed : Password Not Matched...");
        }
    }
    catch(err){
        res.status(400).send("ERROR:"+ err);
    }
});

// API for LogOut
router.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires : new Date(Date.now())
    }).send("Logout Successfully...");
});
module.exports = router;
