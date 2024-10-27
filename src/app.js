const express = require('express');  // import the express 
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/database");   // connection to the db
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// we want middleware to convert the json from the enduser to js object , so we use the express.json()

app.use(express.json());
app.use(cookieParser());

// API for signup (using POST HTTP method to add a new user)
app.post("/signup", async (req,res)=>{
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

app.post("/login", async (req,res)=>{
    
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
        const isMatchedPassword = await bcrypt.compare(password,user.password);
        // console.log(isMatchedPassword);

        if(isMatchedPassword){
            // we will add the logic of authentication , token  & cookies here 

            // 1> Create a JWT Token 
            const token = await jwt.sign({ id : user._id} , JWT_SECRET_KEY,{expiresIn: "1d"});
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
})

//  API for gettig the profile of logged in user
app.get("/profile", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        if(!user) 
            throw new Error("User not found. Please login again...");
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})

// API for sending connection request 
app.get("/sendConnectionRequest", userAuth, async (req,res)=>{
    const user = req.user;
    // Sending the connection request
    console.log("sending the connection request");
    res.send(user.firstName + " sent the conection request ");
})

connectDB()
    .then(()=>{
        console.log("DB Connection Established Successfully...");
        app.listen(PORT, ()=>{
            console.log("Server is successfully listening on port");
        });
    })
    .catch((err)=>{
        console.error("Connection Failure"+ err.message);
    });