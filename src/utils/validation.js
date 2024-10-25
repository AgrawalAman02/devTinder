const validator = require("validator");

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

module.exports = {
    validateSignUp,
}