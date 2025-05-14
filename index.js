require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const controller = require("./controllers/memberController");
const { passport } = require("./config/passport");

const ensureAuth = (req,res,next)=>{
    if(!req.isAuthenticated())
        return res.redirect("/");
    next();
}
const app=express();

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({secret:process.env.SESSION_SECRET,resave:false, saveUninitialized:false}));
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
})

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/register",(req,res)=>{
    res.render("registration");
});
app.post("/register",controller.userRegistration);

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
    if(!user){
        const err={msg:info.message};
        return res.render("login",{errors: [err]})
    };
    if(err)
        return next(err);
    else{
        req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/home");
    });
    }   
    })(req,res,next);
});

app.get("/home",ensureAuth,controller.fillHomepage);
app.get("/member",ensureAuth,(req,res)=>{
    res.render("membershipForm",{title:"Become a member"});
});
app.post("/member",controller.handleMembership);

app.get("/new",ensureAuth,(req,res)=>{
    res.render("newPost",{title:"New Post"});
});

app.post("/new",controller.addNewPost);

app.get("/logout",ensureAuth,(req,res,next)=>{
    req.logOut((err)=>{
        if(err) return next(err);
    })
    res.redirect("/");
})
app.delete("/delete_post",controller.deletePost);
app.use((err,req,res,next)=>{
    res.send("Error page: "+err);
})
app.listen(8080,()=>{console.log("Running")});