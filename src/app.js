const express = require('express');  // import the express 

// now i will create the application of express  -- instance of expressjs
const app = express();

// now app is a server , so we need to listen it in a port no.
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});

// learning error handling...
app.use("/user", (req, res)=>{
    res.send("User Fetched Successfully");
    // as we always write everyhing in the try-catch block and throw the error 
    // but sometimes due to unhandled error, it lead to show vulnerable info in the page 
    // so we do the different stuff
});

//  as we knw that / is wildcard for everyone , so when  nothig matches then lastly we handled it in route "/" 
app.use("/", (err,req,res,next)={   // when four parameters are used then forst one is the error //! REMEMBER
    if(err){
        // we should also log that error so that i can able to get that error
        console.log
        res.status(500).send("something went wrong");
    }
})
