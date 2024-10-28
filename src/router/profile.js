const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//  API for gettig the profile of logged in user
router.get("/profile/view", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        if(!user) 
            throw new Error("User not found. Please login again...");
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

});

router.patch("/profile/edit", userAuth , async (req , res) => {
    try{
        if(!validateEditProfileData(req,res)) throw new Error("Edit is not allowed...");
        
        const loggedInUser = req.user;
        if(!loggedInUser) throw new Error("Please login first!...");

        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();

        res.json({
            message : `${loggedInUser.firstName} , Your profile is updated successfully...`,
            data : loggedInUser,
        })
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = router;
