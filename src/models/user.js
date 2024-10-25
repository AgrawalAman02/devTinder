const mongoose = require("mongoose");
const validator = require("validator");
// const userSchema = new mongoose.Schema({
//     firstName :  {
//         type : String
//     },
//     lastName : String,  // shorthand for String  if only type is defined
//     emailId : String,
//     password : String,
//     age : String,
//     gender : String
// });

// now create a model for user named User where we first pass name of the model and then the name of the schema
// the name of the model should start with capital as it acts as a class 
// const User = mongoose.model("User", userSchema);


// ! Data Sanitisation and schema Validation
const userSchema = new mongoose.Schema({
    firstName :  {
        type : String,
        required : true,  // made it mandatory so that without it db is not added to the collection  
        minLength :[4,'Must be atleast 4 character long. Entered : {VALUE}'],
        maxLength : [20, 'Must be less than 20 characters...'],
    },
    lastName : {
        type : String,
        minLength : [2,'Must be atleast 2 character long. Entered : {VALUE}'],
    }, 
    emailId : {
        type : String,
        required : true,
        // to make the field unique so that duplicate is not allowed
        unique : [true, 'Email-Id must be unique'],
        // if we want every char to be lowercase then make it true so that when someone entrs in cammelcase/other then it auto changes to lowercase
        lowercase : true,
        // if we want to compare after removing the initial and folllowing whitespaces then we use trim
        trim : true,
        // validating if the  url is valid or not
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Id"+ value);
            }
        },
        immutable : true,
    },
    password : {
        type : String,
        required : [true, 'Password is required...'],
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak password! Password must have minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 ");
            }
        },
    },
    age : {
        type : Number,
        min :[ 16,'Must be atleast 4 character long. Entered : {VALUE}'],
    },
    gender :{
        type : String,
        lowercase : true,
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender Data is not valid");
            }
        }
        // but this validate only appl when i add new user but it not applied when i update an user
        // so we have to enable to run on updates also
        // so we have to go to the update method in patch i.e. findByIdAndUpdate , where we use option for running validators
    },
    photoUrl : {
        type : String,
        default : "https://th.bing.com/th/id/OIP.dZ5jtDvU7KmHfjCen9dp1QAAAA?w=146&h=150&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL : "+ value);
            }
        },
    },
    about : {
        type : String,
        default : "This is default About for the user...",
    },
    skills :{
        type: [String],
    }
},
{
    timestamps : true,
});




// module.exports= User;

// in ShortHand we can do 

module.exports = mongoose.model("User", userSchema);