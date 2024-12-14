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
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
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


router.get("/user/feed?.page=1&limit=10", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.params.page) || 1;
        let limit = parseInt(req.params.limit) || 10;
        limit = limit>50? 50 : limit;

        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id,},
                {toUserId : loggedInUser._id,},
            ]
        }).select("fromUserId toUserId");

        const hiddenUserFromFeed = new Set();

        connectionRequest.forEach((req) => {
            hiddenUserFromFeed.add(req.fromUserId.toString()),
            hiddenUserFromFeed.add(req.toUserId.toString())
        });

        const user = await User.find({
            $and:[
                {_id : {$nin : Array.from(hiddenUserFromFeed)}, },
                { _id : {$ne : loggedInUser._id},},
            ]
        }).select("firstName lastName photoUrl skills").skip(skip).limit(limit);

        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});
module.exports = router;