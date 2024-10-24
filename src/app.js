const express = require('express');  // import the express 
const connectDB = require("./config/database");   // connection to the db
const app = express();
const User = require("./models/user");

// API for signup (using POST HTTP method to add a new user)
app.post("/signup", async (req,res)=>{
    // Creating a new instance of the User model
    const user = new User({
        firstName : "aman",
        lastName : "kumar",
        age: "21",
        gender : "Male",
        emailId :"aman@gmail.com",
        password: "aman123",
    });

    await user.save()
        .then(()=>{
            res.send("User Added Successfully...");
        })
        .catch((err)=>{
            res.status(501).send("there is something wrong while adding the user ...");
            console.log(err);
        });
// we can use try and catch block
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