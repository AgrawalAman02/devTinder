const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");

// API for sending connection request 
router.get("/sendConnectionRequest", userAuth, async (req,res)=>{
    const user = req.user;
    // Sending the connection request
    console.log("sending the connection request");
    res.send(user.firstName + " sent the conection request ");
})


module.exports = router;