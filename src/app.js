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


/*
! if we use this below piece of code here then as it is checking linewise then first it check that / we are getting then after / if we got anything then still it will give this same output
! but if we write this piece after all subpath then it will first check the subpath if subpath correct then it will show that otherwise the root path which is defined below
! so order matters a lot a lot alot .. so routing order is essential 

app.use("/",(req,res)=>{
    res.send("Namaste from server");
});
*/
// if this piece of code is written below test then this abraadabrah will not print in this route as fisrst it check the /test is availbale ? -Yes then it will print 
// but we are writing before then forst it check the /test/1 if yess then it send this response otherwise / test response
// app.use("/test/1", (req,res)=>{
//     res.send("ABRAKADABRAH...");    
// });

// app.use("/test",(req,res)=>{
//     res.send("hello from test");
// });
// // but on normal localhost:7777 we will get msg as "Cannot GET /"  as we define for /test 
// // but when we write /home then we get "cannot GET /home" lets define  for /home..
// app.use("/home",(req,res)=>{
//     res.send("hello from home page");
// });

// app.use("/",(req,res)=>{
//     res.send("Namaste from server");
// });

// ! Note : we dont want to rerun again again so we use nodemon & we dont want o write long command again and again so we write it in in the package.json 
// we only need npm run dev 

// !---------------------------POST----------------------------------! //

/*
? as we are using the app.use() so it is matching all the http methods 
* but if we do the app.get then it only match the GET method of http

*/

app.get("/user", (req,res)=>{
    res.send({firstName: "Aman", lastName: "Agrawal" });
})
// we cant get respone when we do post call to the /user 
// but if we use app.post then we can make post call
app.post("/user",(req,res)=>{
    // "save data to the database"
    res.send("Data had beeen successfully saved to the database");
})

// we can also make delete call
app.delete("/user", (req,res)=>{
    res.send("data deleted successfully");
});
app.use("/",(req,res)=>{
    res.send("Namaste from server");
});