const bodyParser = require("body-parser");
const express=require("express");
const path=require("path");
const app=express();
const bodyparser=require("body-parser");
const session=require("express-session");


const router=require("./router");


const port =process.env.PORT||5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");




app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: true,
}));


app.use(express.static("public"));
app.use("/route",router);


app.get("/", (req,res) => {
    console.log("render");
    res.render("base",{ title: "Login System"});
});

app.get("/register",(req,res) => {
    res.render("register",{title:"Register"});
})
app.get("/dashboard",(req,res) => {
    if(req.session.user){
        res.render("dashboard",{ user:req.session.user})
    }
    else{
        res.send("Unauthorised Access");
    }
});


app.listen(port, () => {
    console.log("Listening");
})

