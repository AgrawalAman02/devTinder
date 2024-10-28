const validator = require("validator");
const bcrypt = require("bcrypt");

const validateSignUp = (req)=>{
    const {firstName, lastName, emailId, password } = req.body;
    
    if(!firstName || !lastName || !emailId || !password) {
        throw new Error("Fill all the field...");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("please enter a valid email id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Weak password. Please re-enter");
    }
}

const validateEditProfileData = (req,res)=>{
    try{
        const ALLOWED_UPDATES = ["firstName", "lastName", "age", "about","skills","photoUrl"];
        const isEditAllowed = Object.keys(req.body).every((key)=>{
            return ALLOWED_UPDATES.includes(key)
        }); 
        if(req.body.skills?.length>10) throw new Error("Max 10 skills allowed...");
        if(req.body.about?.length>50) throw new Error("max length of about is 50...");

        return isEditAllowed;
    } catch(err){
        res.status(401).send("ERROR: "+err.message);
        return false;
    }
}

const validatePassword=async (req)=>{
    const{ newPassword,currentPassword }= req.body;
    const loggedInUser = req.user;

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword,loggedInUser.password);
    if(!isCurrentPasswordValid) throw new Error("Your entered pasword didnt matched. Please re-enter the current password");

    if(!validator.isStrongPassword(newPassword)) throw new Error("New Password must be strong enough...");
    return true;
}


module.exports = {
    validateSignUp,
    validateEditProfileData,
    validatePassword
}