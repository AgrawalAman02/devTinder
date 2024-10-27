const mongoose = require("mongoose");
require("dotenv").config();
const url  = process.env.MONGODB_URL;
const connectDB = async ()=>{
    await mongoose.connect(url);   // connected to devTinder DB
    
}
// we want that the db connection set first then the app will listen the port 
// so we export the connectDB function from here...

module.exports= connectDB