const adminAuth = (req,res,next)=>{
    console.log("Admin Auth is getting checked...");
    const token = "xyz";
    const isAdminAuthourised = token === "xyz";
    if(!isAdminAuthourised){
        res.status(401).send("Unauthorised Request");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("User Auth is getting checked...");
    const token = "xyz";
    const isAdminAuthourised = token === "xyz";
    if(!isAdminAuthourised){
        res.status(401).send("Unauthorised Request");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}