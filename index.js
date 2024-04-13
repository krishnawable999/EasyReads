const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

mongoose.connect("mongodb://127.0.0.1:27017/EasyReads").then((e) => console.log("Connected to MongoDB"));

app.use(express.urlencoded({extended: false}));

app.get("/", (req,res)=>{
    res.render('home');
});

app.use("/user",userRoute);

app.listen(port, ()=>{
    console.log("Server stared at port:"+port);
});