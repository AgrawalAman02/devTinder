const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName :  {
        type : String
    },
    lastName : String,  // shorthand for String  if only type is defined
    emailId : String,
    password : String,
    age : String,
    gender : String
});

// now create a model for user named User where we first pass name of the model and then the name of the schema
// the name of the model should start with capital as it acts as a class 
// const User = mongoose.model("User", userSchema);

// module.exports= User;

// in ShortHand we can do 

module.exports = mongoose.model("User", userSchema);