const express = require('express');  // import the express 
const connectDB = require("./config/database");   // connection to the db
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

// we want middleware to convert the json from the enduser to js object , so we use the express.json()

app.use(express.json());

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
        console.log(user);
        console.log(password,user.password);
        const isMatchedPassword = await bcrypt.compare(password,user.password);
        console.log(isMatchedPassword);

        if(isMatchedPassword){
            res.send("Login successful...");
        }else{
            throw new Error("Login failed : Password Not Matched...");
        }
    }
    catch(err){
        res.status(400).send("ERROR:"+ err);
    }
})

// Api to get user by email
app.get("/user",async (req,res)=>{  // we are finding using email which we got in request 
    try{
        const users = await User.find({emailId : req.body.emailId});   // is we use findOne then it return only one in case of duplication
        if(users.length === 0){
            res.status(404).send("User Not Send");
        }else{
            res.send(users);
        }
        
    }
    catch(err){
        res.status(500).send("Something went wrong..");
    }
});

// API for Feed - to get all the user from the database
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});  // empty filter so that we will get all the user
        res.send(users);
    }
    catch(err){
        res.status(500).send("Something went wrong..");
    }
    
});


// API for Updating the details of user
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;  // getting user id from the api 
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender","age"];
        const isUpdateAllowed = Object.keys(data).every((k)=>{   // checking if the data for updating is present in the ALLOWED UPDAtes array
            ALLOWED_UPDATES.includes(k);
        });
        if(!isUpdateAllowed){   // if data is not present then updates is not allowed...
            throw new Error("Updates not allowed...");
        }
        // to restrict user to enter only a fixed amount of the skills,we can add validation
        if(data?.skills.length() > 10){
            throw new Error("Skills cant be more than 10...");
        }
        const user = await User.findByIdAndUpdate(userId, data,{
            returnDocument : "after",
            runValidators : true,   // to enable the validation on update,
        });

        res.send("User Updated successfully...");
    }
    catch(err){
        res.status(500).send("Something went wrong.."+ err.message);
    }
})

// API for deleting the user 
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;

    try{
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully...");
    }
    catch(err){
        res.status(500).send("Something went wrong..");
    }
});

connectDB()
    .then(()=>{
        console.log("DB Connection Established Successfully...");
        app.listen(7777, ()=>{
            console.log("Server is successfully listening on port 7777");
        });
    })
    .catch(()=>{
        console.error("Connection Failure");
    });