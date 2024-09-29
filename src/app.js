const express = require('express');  // import the express 

// now i will create the application of express  -- instance of expressjs
const app = express();

// now app is a server , so we need to listen it in a port no.
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});

// now if we want to respond according to request ,we will create a request handler finction in app.use();
// app.use((req,res)=>{
//     res.send("hello from server");   // this is respond to any request on the server 
// });

// is we want different response to different request then 
// we can pass a path in the first parameter then on /tset this will show this console 
app.use("/test",(req,res)=>{
    res.send("hello from test");
});
// but on normal localhost:7777 we will get msg as "Cannot GET /"  as we define for /test 
// but when we write /home then we get "cannot GET /home" lets define  for /home..
app.use("/home",(req,res)=>{
    res.send("hello from home page");
});

app.use("/",(req,res)=>{
    res.send("Namaste from server");
});

// ! Note : we dont want to rerun again again so we use nodemon & we dont want o write long command again and again so we write it in in the package.json 
// we only need npm run dev 