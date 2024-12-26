const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
        shortId:{
            type: String,
            required: true,
            unique: true
        },
        redirectURL:{
            type: String,
            require: true,
        },
        visitHistory: [ {timestamp: {type:String}} ],
    },
    {timestamps:true}
)

const URL  = mongoose.model("urld",urlSchema);

module.exports = URL;