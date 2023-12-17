import passport from "passport";
// import { logger } from "../helpers/logger.js";

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


//role admin
export const checkRole = (roles)=>{ 
    return(req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        } else{
            res.json({status:"error", message:"No tienes permiso para este recurso"})
            // logger.error("No tienes permiso para este recurso (auth.js)")
        };
    }
};

export const checkAuthenticated = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.json({status:"error", message:"No tienes permiso para este recurso"})
        // logger.error("No tienes permiso para este recurso. Usuario no logueado")
    }
};