const express = require('express');  // import the express 

// now i will create the application of express  -- instance of expressjs
const app = express();

// now app is a server , so we need to listen it in a port no.
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});

/*
app.use("/user", (req,res)=>{
    // Route Handler
    // res.send("Route Handler 1 ");  // here we are sending the response from the server;
    // but if we dont send the response then we see that in postman it show sending Request so we understand that we are not getting the response
    console.log("handling Route");  // this even wont work as it only so console but we dont get the response from server
    res.send("response!! "); // so we need to send the response
})
*/

// we can have multiple route handler . Let See...
// app.use("/user",
//     (req,res)=>{
//         console.log("1st Route Handler");
//         res.send("response 1");
//     },
//     (res,req)=>{
//         console.log("2nd Route Handler");
//         res.send("Response 2");
//     }
// );  // now which route will it listen -> it will listen the 1st route 
// why it not go to sencond handler -> bcoz-> js is asynhronous , so when response is send then there is no need to look below

// app.use("/user",
//     (req,res)=>{
//         console.log("1st Route Handler");
//     },
//     (res,req)=>{
//         console.log("2nd Route Handler");
//         res.send("Response 2");
//     }
// ); // now we see here that it will continue to send the resquest and 2nd handler is not working , why?
//  forst it go to first handler where it dont get response  but there is nothing which prompt it to go sencond
//  so we need next as an arguement to switch second 


// app.use("/user",
//     (req,res, next)=>{
//         console.log("1st Route Handler");
//         res.send("response 1");
//         next();
//     },
//     (res,req)=>{
//         console.log("2nd Route Handler");
//         res.send("Response 2");
//     }
// ); 
// still it dont go to second as after getting response we dont need next one

// app.use("/user",
//     (req,res,next)=>{
//         console.log("1st Route Handler");
//         next();
//         // res.send("response 1");
//     },
//     (req,res)=>{
//         console.log("2nd Route Handler");
//         res.send("Response 2");
//     }
// ); // here we will get 1st Route Handler,2nd Route Handler in console and Response 2 in webpage

// app.use("/user",
//     (req,res,next)=>{
//         console.log("1st Route Handler");
//         next();
//         res.send("response 1");
//     },
//     (req,res)=>{
//         console.log("2nd Route Handler");
//         res.send("Response 2");
//     }
// ); 
// look here after 1st Route Handler  2nd Route Handler and response 2 on webpage , we got an error as after all when it comes on 
// res.send("response 1"); then as res is already sent so we get an error 
// Cannot set headers after they are sent to the client


// app.use("/user",
//     (req,res,next)=>{
//         console.log("1st Route Handler");
//         next();
//         // res.send("response 1");
//     },
//     (req,res,next)=>{
//         console.log("2nd Route Handler");
//         // res.send("Response 2");
//         next();
//     }
// ); 

// what it does ?
// it gives an error -> cannot get /user  as it is expecting another route handler but isnt present 
// we can even have more than two route handler with next 
// but if in next we dont write res.send and also there is not next then we will see sending request 

app.use("/user",
    (req,res,next)=>{
        console.log("1st Route Handler");
        next();
        // res.send("response 1");
    },
    (req,res,next)=>{
        console.log("2nd Route Handler");
        // res.send("Response 2");
        next();
    },
    (req,res,next)=>{
        console.log("3rd Route Handler");
        // res.send("Response 2");
        next();
    },
    (req,res,next)=>{
        console.log("4th Route Handler");
        res.send("Response 4");
        // next();
    }
); 
/*
1st Route Handler
2nd Route Handler
3rd Route Handler
4th Route Handler

respinse 4
*/


// we can even wrap these request handler into an array 
app.use("/user",
    [(req,res,next)=>{
        console.log("1st Route Handler");
        next();
        // res.send("response 1");
    },
    (req,res,next)=>{
        console.log("2nd Route Handler");
        // res.send("Response 2");
        next();
    },
    (req,res,next)=>{
        console.log("3rd Route Handler");
        // res.send("Response 2");
        next();
    },
    (req,res,next)=>{
        console.log("4th Route Handler");
        res.send("Response 4");
        // next();
    }]
); 
// so after running we saw that it still runs the same . so wrapping in array have no effect 

// So what I want to understand that
/* rH = route Handler 
app.use("/route", [rH, rH2, rH3, rH4, rH5, rH6]);
app.use("/route", [rH, rH2, rH3, rH4], rH5, rH6);
app.use("/route", rH, rH2, [rH3, rH4], rH5, rH6);
app.use("/route", rH, rH2, rH3, rH4,[ rH5, rH6]);

so we can wrap any part of it in array , still it has no effect 
*/

