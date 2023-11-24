const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

const dbURI="mongodb+srv://vishnupillai3413:vishnu123@node.odyl0yb.mongodb.net/test?retryWrites=true&w=majority";

router.use(express.static("public"));

mongoose.connect(dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})
const userSchema=new mongoose.Schema({
    email: String,
    password: String,
});

const User= mongoose.model("User", userSchema);

router.post("/login",async (req,res) => {
    console.log("Loggin In");
    const user=await User.findOne({
        email:req.body.email,
        password: req.body.password,
    })
    if(user){
        req.session.user=req.body.email;
        res.redirect("/dashboard");
        // res.end("Login Successful"); 
    }
    else{
        res.render("base",{title:"Login", logout:"Invalid Email or Password"});
    }
});

router.post("/register", async(req,res) => {
    console.log("Registering");
    const newUser=new User({
        email : req.body.email,
        password: req.body.password,
    })

    await newUser.save();
    res.redirect("/");


})

router.get("/logout",(req,res) =>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            console.log("Logout");
            res.render("base",{ title:"Login System", logout:"Successfully logout"})
        }
    });
})


module.exports=router;