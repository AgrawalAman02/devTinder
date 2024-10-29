const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

// API for sending connection request 
router.get("/request/send/:status/:userId", userAuth, async (req,res)=>{
    try{
        const fromUserId = req.user.id;
        const toUserId = req.params.userId;
        const status = req.params.status;
        
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "Invalid status type : "+ status});
        }

        const isExistingConnection = await ConnectionRequest.findOne({
            $or:[
                { fromUserId,toUserId},
                { fromUserId :toUserId , toUserId : fromUserId }
            ],
        });

        if(isExistingConnection){
            return res.status(400).json({
                message : "Connection Request Already Established",
                success : false,
            })
        }

        const isUser = await User.findById(toUserId);
        if(!isUser){
            return res.status(404).json({
                message : "User not found",
                success : false,
            });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Connection Request is sent successfully...",
            data,
        });

    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})


module.exports = router;