const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");

//  API for gettig the profile of logged in user
router.get("/profile", userAuth, async (req, res)=>{
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

module.exports = router;
