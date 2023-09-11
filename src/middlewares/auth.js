import passport from "passport";

export const checkUserAuthenticated = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        next();
    } else {
        res.redirect("/login");
    }
};

export const showLoginView = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        res.redirect("/perfil");
    } else {
        next();
    }
};

export const authenticate = (strategy)=>{

    return passportAuthenticate = async(req,res,next)=>{
        passport.authenticate(strategy , {session:false} , (err,user,info)=>{
            if(err) return next(err);
            if(!user){
                return res.json({status:"error", message:"token no valido"})
            }
            req.user = user;
            next();
        })(req,res,next);
    }
};