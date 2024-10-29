const express = require("express");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");
const connection = require("../models/connection");


// Get all the pending requests for the logged in user 
router.get("/user/requests/received", userAuth, async (req,res)=>{
    try{
        
        const loggedInUser = req.user;
    
        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId"," firstName lastName photoUrl skills");

        res.json({
            message : "Data fetched successfully...",
            data : connectionRequest,
        });
        

    }catch(err){
        res.status(400).json({
            message: "ERROR - "+ err.message,
            success : false,
        });
    }
});

// API to get all the connection of the user
router.get("/user/connections", userAuth, async (req,res)=>{
    try{
        
        const loggedInUser = req.user;
        
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { fromUserId : loggedInUser._id , status : "accepted"},
                { toUserId : loggedInUser._id, status : "accepted" },
            ],
        })
        .populate("fromUserId", "firstName lastName photoUrl skills")
        .populate("toUserId", "firstName lastName photoUrl skills");   // for checking if the connection is sent from the logged in user.
        
        const data = connectionRequest.map((row)=> {
            if(row.fromUserId._id.toString() === loggegInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json(data);

    }catch(err){
        res.status(400).json({
            message: "ERROR - "+ err.message,
            success : false,
        });
    }
});

module.exports = router;