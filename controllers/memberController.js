const db = require("../model/queries");
const{validationResult,body} = require("express-validator");
const bcrypt = require("bcrypt");

const registerValidation=[
    body("name").trim().isAlpha().withMessage("Name can only contain letters.")
    .isLength({min:2}).withMessage("Name must be at least 2 letters long."),
    body("surname").trim().isAlpha().withMessage("Surname can only contain letters.")
    .isLength({min:2}).withMessage("Surname must be at least 2 letters long."),
    body("username").trim().matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Username can only contain letters, numbers, hyphens (-), and underscores (_).')
    .isLength({min:5}).withMessage("Username must be at least 5 characters long."),
    body("password").trim().matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username can only contain letters, numbers, hyphens (-), and underscores (_).')
    .isLength({min:6}).withMessage("Password must be at least 6 characters long."),
    body("confirm").trim().custom((value,{req})=>{
        if(value!==req.body.password)
            throw new Error("Passwords don't match")
        else
            return true;
    })
];

const postValidation =[
    body("title").trim().isLength({min:5}).withMessage("Post titles must be at least 5 characters long"),
];

const userRegistration = [registerValidation,async(req,res)=>{
    const data = req.body;
    const hashed=await bcrypt.hash(data.password,10);
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).render("registration",{errors:errors.array(),values:data});

    try {
        if(data.admin)
            await db.insertUser(data.username,hashed,data.name,data.surname,"member",true);
        else
            await db.insertUser(data.username,hashed,data.name,data.surname,"not",false);
    } catch (error) {
        const er={msg:error.message}
        return res.status(400).render("registration",{errors:[er],values:data});
    }
    res.redirect("/login");
}];

const fillHomepage = async(req,res)=>{
    const posts = await db.allPosts();
    res.render("home",{posts:posts,title:"Home"});
}

const handleMembership = async(req,res)=>{
    const data = req.body;
    const userId = req.user.id;
    if(data.code === String(process.env.SECRET_CODE)){
        await db.newMemeber(userId);
        return res.redirect("/home");
    }
    else{
        const err = {msg:"Wrong code!"}
        return res.render("membershipForm",{title:"Become a member",errors:[err]});
    }
}

const addNewPost = [postValidation,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render("newPost",{errors:errors.array()});
    }
    const date = new Date();
    const day=date.getDate();
    const month=date.toLocaleString('en-US',{month:"long"});
    const year = date.getFullYear();
    const timestamp = day+' '+month+' '+year;
    try {
        await db.insertPost(req.user.id,req.body.title,req.body.content,timestamp);
    } catch (error) {
        const err={msg:error}
        return res.render("newPost",{errors:[err]});
    }
    res.redirect("/home");
}];

const deletePost = async(req,res)=>{
    try {
        const {postId}=req.body;
        await db.deletePost(postId);
    } catch (error) {
        return res.status(400).send(error);
    }
    return res.json({redirect:"/home"});
}

module.exports={userRegistration,fillHomepage,handleMembership,addNewPost,deletePost}