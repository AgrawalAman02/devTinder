const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        // "mongodb+srv://aman-agrawal02:Agrawal%4002DbMongo@amanagrawal.8bfiu.mongodb.net/" // as this is connecting to the cluster which have many db
        "mongodb+srv://aman-agrawal02:Agrawal%4002DbMongo@amanagrawal.8bfiu.mongodb.net/devTinder"  // connected to devTinder DB
    );
}
// we want that the db connection set first then the app will listen the port 
// so we export the connectDB function from here...

module.exports= connectDB