const express = require('express');  // import the express 

// now i will create the application of express  -- instance of expressjs
const app = express();

// now app is a server , so we need to listen it in a port no.
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});

// Handle Auth MiddleWare for all GET , POST , And others..
const { adminAuth , userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth );
// app.use("/user", userAuth ); // we can also write this 
// app.use("/user", (req,res)=>{
//     res.send("Fetch User Successfully...");
// })

// or we cann even do the following way in one method

app.use("/user",  userAuth, (req, res)=>{
    res.send("User Fetched Successfully");
});

app.use("/admin/getAllData", (req,res)=>{
    res.send("All Data Sent...");
});
app.use("/admin/deleteAllData", (req,res)=>{
    res.send("All Data deleted...");
});

