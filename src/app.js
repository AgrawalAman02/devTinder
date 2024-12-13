const express = require('express');  // import the express 
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/database");   // connection to the db
const app = express();
const cookieParser = require("cookie-parser");
const authRouter  = require("./router/auth");
const profileRouter  = require("./router/profile");
const requestRouter  = require("./router/request");
const userRouter = require("./router/user");


// we want middleware to convert the json from the end-user to js object , so we use the express.json()

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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