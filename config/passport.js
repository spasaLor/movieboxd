const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../model/queries");
const bcrypt = require("bcrypt");

const strat = new LocalStrategy(async(username,password,done)=>{
    try {
        const user = await db.getUserByUname(username);
    
        if(!user)
            return done(null,false,{message:"Username doesn't exist"});

        const match= await bcrypt.compare(password,user.password);

        if(!match)
            return done(null,false,{message:"Incorrect password"});
        return done(null,user);

    } catch (error) {
        return done(error);
    }
})

passport.use(strat);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await db.getUserById(id);
        done(null,user);
    } catch (error) {
        done(error);
    }
})

module.exports={passport};