const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(cookieparser());
mongoose.connect("mongodb://127.0.0.1:27017/EasyReads").then((e) => console.log("Connected to MongoDB"));

app.use(express.urlencoded({extended: false}));

app.use(checkForAuthenticationCookie("token"));
app.get("/", (req,res)=>{
    res.render("home",{
        user: req.user,
    });
    
});

app.use("/user",userRoute);

app.listen(port, ()=>{
    console.log("Server stared at port:"+port);
});