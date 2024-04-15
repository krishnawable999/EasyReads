const { Router } = require("express");
const User = require("../models/user");
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null,filename);
    }
  })

  const upload = multer({ storage: storage});

router.get("/addnew", (req,res)=>{
    return res.render("addblog",{
        user: req.user,
    });
})

router.post("/", upload.single('coverImage'), async (req,res)=>{
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blog._id}`);
})


module.exports = router;