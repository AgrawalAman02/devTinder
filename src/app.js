const express = require('express');  // import the express 
const connectDB = require("./config/database");   // connection to the db
const app = express();
const User = require("./models/user");

// we want middleware to convert the json from the enduser to js object , so we use the express.json()

app.use(express.json());

// API for signup (using POST HTTP method to add a new user)
app.post("/signup", async (req,res)=>{
    // console.log(req) gives a whole req but we get the data from the endpoit in readable format and the data is present in the body 
    // Creating a new instance of the User model
    const user = new User(req.body);  // makes the data dynamic by passing data from request 

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