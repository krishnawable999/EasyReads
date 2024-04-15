const {Schema, model, default: mongoose} = require("mongoose");
const { createHmac, randomBytes} = require('node:crypto');
const {createTokenforUser,validateToken} = require("../services/authentication")
const userSchema = new Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,

    },
    password: {
        type: String,
        required: true,
    },
    profileURL: {
        type: String,
        default: "./public/images",
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",
    }
},{timestamps: true});

userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPass = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPass;
    next();
});

userSchema.static('matchPasswordAndGenerateToken',async function (email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error ('User not Found');
    const salt = user.salt;
    const hashedPass = user.password;
    const userProvidedpass = createHmac('sha256', salt).update(password).digest("hex");

    if(hashedPass !== userProvidedpass)throw new  Error("Incorrect Password!");


    const token = createTokenforUser(user);
    return token;
})

const User = model('user', userSchema);

module.exports = User;