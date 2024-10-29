const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({

    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type : String,
        required : true,
        enum :{
            values : ["accepted", "rejected", "ignore","interested"],
            message : `{VALUE} is incorrect status type`,
        },
    }
},
{
    timestamps : true,
});

connectionSchema.pre("save", function (next){
    // checking if fromUserId is same as toUserId 
    if(this.fromUserId.equals(this.toUserId)) {
        throw new Error("Cant send connection request to yourself..");
    }
    next();
});

module.exports = new mongoose.model("ConnectionRequest", connectionSchema);
