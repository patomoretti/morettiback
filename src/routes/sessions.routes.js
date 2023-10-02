import { Router } from "express";
import { usersDao } from "../dao/index.js";
import { usersModel } from "../dao/mongo/models/users.model.js";
import { createHash, generateToken } from "../utils.js";
import passport from "passport";
// import CookieParser from "cookie-parser";

const router = Router();


//localhost:8080/api/sessions/signup   //passport
router.post("/signup", passport.authenticate("signupStrategy" ,{
    failureRedirect:"/api/sessions/fail-signup"
}) , async (req,res)=>{
    try {
        const signupForm = req.body;
        const user = await usersService.getByEmail(signupForm.email);
        if(user){
            return res.render("signup", {error:"El usuario ya estar registrado"});
        };
        const newUser = {
            first_name: signupForm.first_name,
            email: signupForm.email,
            password: createHash(signupForm.password)
        };
        const result = await usersService.save(newUser);
        res.render("login", {message:"usuario registrado"});
    } catch (error) {
        res.render("signup", {error:error.message})
    }
});

//localhost:8080/api/sessions/fail-signup
router.get("/fail-signup", (req,res)=>{
    res.render("signup",{error:"No se pudo registrar el usuario"});
});

router.get("/login")
//localhost:8080/api/sessions/login
router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect:"/api/sessions/fail-login"
}), async (req,res)=>{
    const loginForm = req.body;
    const user = await usersModel.find({email,password});
    if (user) {
        if(user.password===loginForm.password){
            const token = generateToken({email:loginForm});
            res.cookie("cookie-token", token, {httpOnly:true}).json({status:"success", message: "login exitoso"});
            if(isValidPassword(user, loginForm.password)){ 
                req.session.userInfo = {first_name:user.first_name, email:user.email};
                res.render("profile",{
                    first_name:loginForm.first_name,
                    last_name:loginForm.last_name,
                    age:loginForm.age,
                    email:loginForm.email,
                    isAdmin:loginForm.role === "admin" ? true : false, 
                })
            }
        }else{
            res.json({status:"error", message:"credenciales invalidas"});
        }
    } else {
        res.json({status:"error", message:"usuario no registrado"});
    }
    res.json({status:"success", message:"peticion recibida"});
});


// //localhost:8080/api/sessions/login
// router.post("/login",async (req,res)=>{
//     try {
//         const loginForm = req.body;
//         const user = await usersService.getByEmail(loginForm.email);
//         // const userAdmin={
//         //     email: loginForm.email,
//         //     role: loginForm.role
//         // };
//         if(!user){
//             return res.render("login", {error:"El usuario no se ha registrado"});
//         }
//         if(isValidPassword(user, loginForm.password)){ 
//             req.session.userInfo = {first_name:user.first_name, email:user.email};
//             res.render("profile",{
//                 first_name:loginForm.first_name,
//                 last_name:loginForm.last_name,
//                 age:loginForm.age,
//                 email:loginForm.email,
//                 isAdmin:loginForm.role === "admin" ? true : false, 
//             })
//         }else{
//             return res.render("login", {error:"Credenciales invalidas"});
//         }
//     } catch (error) {
//         res.render("signup", {error:error.message})
//     }
// });




//localhost:8080/api/sessions/profile
router.get("/profile", (req,res)=>{
    console.log(req.cookies['cookie-token']);
    res.json({message:"peticion recibida"});
});

//localhost:8080/api/sessions/fail-login
router.get("/fail-login", (req,res)=>{
    res.render("login", {error:"Credenciales invalidas"});
});

//localhost:8080/api/sessions/current
router.get("/current", (req,res)=>{
    
});







//autenticando el passport con github
// localhost:8080/api/sessions/loginGithub
router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

// localhost:8080/api/sessions/github-callback
router.get("/github-callback", passport.authenticate("githubLoginStrategy",{
    failureRedirect:"api/sessions/fail-signup"
}), (req,res)=>{
    res.redirect("/perfil");
    // res.render("login", {message:"usuario registrado"});
});



//localhost:8080/api/sessions/logout
router.post("/logout",(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.render("profile",{user: req.session.userInfo, error:"No se pudo cerrar la sesion"});
        res.redirect("/");
    })
});


//localhost:8080/api/sessions/changePass  
router.post("/changePass", async (req,res)=>{
    try {
     const form = req.body;
     const user = await usersDao.getByEmail(form.email);
     if(!user){
         return res.render("changePassword", {error: "No es posible cambiar la contraseña"});
     }
     user.password = createHash(form.newPassword);
     await usersDao.update(user._id, user);
     return res.render("login", {message:"Contraseña restaurada"})
    } catch (error) {
     res.render("changePassword", {error:error.message});
    }
 });


export {router as sessionsRouter};