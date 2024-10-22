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

/*
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

*/

//! Date 22/10/2024

// now let learn some more  Advanced routing technique

// app.get("/abc",(req,res)=>{
//     res.send("Checked Successfully!...");
// });
// now if we use the <char>? then that char is optional 

// app.get("/ab?c",(req,res)=>{  // b is optional...
//     res.send("Checked Successfully!...");
// });

// now on having <char>+ then we can use any no. of that char(atleast one) , then still our response is same 
// app.get("/ab+c",(req,res)=>{  // any no. of b then same response  
//     res.send("Checked Successfully!...");
// });

// now if we use <char>* then at the position of * we can insert any string then stillour result is same 
// app.get("/ab*c",(req,res)=>{  // b is optional...
//     res.send("Checked Successfully!...");
// });

// we can even grp the string using the ();
// app.get("/a(bcd)?c",(req,res)=>{  // bcd as a grp is optional...
//     res.send("Checked Successfully!...");
// });

// ? we can even write regex there 
// the regex means that if that condition occurs then the response we will abke to get;
// app.get(/a/,(req,res)=>{  // anywhere if we get the a then response ...
//     res.send("Checked Successfully!...");
// });
// we can also write comples reges tooo
// like /.*fly$/ -> means that * = means starts with anything . so if the path starts with anything and end with fly then the response we get
// buttterfly , mutterfly, jfoefly,etc......
// app.get(/.*fly$/,(req,res)=>{  
//     res.send("Checked Successfully!...");
// }); 


// // we an even pass dynamic userid and we can also get that params/query
// app.get("/user",(req,res)=>{     // userid is dynamic in the webpage like user?userid=101 and we can even send more thing by using & like   http://localhost:7777/user?userid=106&pwd=agr
//     // we can get that query params also-> in req.query
//     console.log(req.query);  // this print that id in json format in the console   -> { userid: '106', pwd: 'agr' }
//     res.send("Checked Successfully!...");
// });
    
// now how can we handle dynamic apis like /user/121 , /user/2 
// we can user /:userId then anything after / will save in the userId and we can print it by req.params
app.get("/user/:userId/:name",(req,res)=>{ 
    console.log(req.params);
    res.send("Checked Successfully!...");
});  // like http://localhost:7777/user/102/aman then we got { userId: '102', name: 'aman' }



app.use("/",(req,res)=>{
    res.send("Namaste from server");
});