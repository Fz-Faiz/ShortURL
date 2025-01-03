const express = require("express")

const path = require("path");
const cookieParser = require("cookie-parser")

const URL = require("./models/url")

const {connectToMongoDB} = require("./connection")

const staticRoute  = require("./routes/staticRouter")

const urlRoute = require("./routes/url")

const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");



const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoDB Connected..."))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use("/url",restrictToLoggedinUserOnly,urlRoute)
app.use("/user",userRoute)
app.use("/",checkAuth,staticRoute)




app.use("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            },
        },
    })
    res.redirect(entry.redirectURL)
});

app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))