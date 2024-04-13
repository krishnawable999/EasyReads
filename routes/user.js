const { Router } = require("express");
const User = require("../models/user")
const router = Router();

router.get("/signin", (req,res)=>{
    return res.render("signin");
});

router.get("/signup", (req,res)=>{
    return res.render("signup");
});

router.post("/signin", (req,res)=>{
    const {email, password} = req.body;
    // console.log("email"+email, "password"+password);
    // User.matchPassword(email,password);
    const user = this;
    console.log('User',user);
    return res.redirect("/");
})


router.post("/signup", async(req,res)=>{
    const {fullname, email, password} = req.body;
    await User.create({
        fullname,
        email,
        password,
    });

    return res.redirect("/")
})


module.exports = router;