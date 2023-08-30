import { Router } from "express";
import { usersService } from "../dao/index.js";
// import { usersModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//passport
//localhost:8080/api/sessions/signup
router.post("/signup", passport.authenticate("signupStrategy" ,{
    failureRedirect:"/api/sessions/fail-signup"
}) , (req,res)=>{
    res.render("login",{message:"usuario registrado"});
});

//localhost:8080/api/sessions/fail-signup
router.get("/fail-signup", (req,res)=>{
    res.render("signup",{error:"No se pudo registrar el usuario"});
});

//localhost:8080/api/sessions/login
router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect:"/api/session/fail-login"
}), (req,res)=>{
    res.redirect("/perfil")
});

//localhost:8080/api/sessions/fail-login
router.get("/fail-login", (req,res)=>{
    res.render("login", {error:"Credenciales invalidas"});
});




// //localhost:8080/api/sessions/signup
// router.post("/signup", async (req,res)=>{
//     try {
//         const signupForm = req.body;
//         const user = await usersService.getByEmail(signupForm.email);
//         if(user){
//             return res.render("signup", {error:"El usuario ya estar registrado"});
//         };
//         const newUser = {
//             first_name: signupForm.first_name,
//             email: signupForm.email,
//             password: createHash(signupForm.password)
//         };
//         const result = await usersService.save(newUser);
//         res.render("login", {message:"usuario registrado"});
//     } catch (error) {
//         res.render("signup", {error:error.message})
//     }
// });

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
     const user = await usersService.getByEmail(form.email);
     if(!user){
         return res.render("changePassword", {error: "No es posible cambiar la contraseña"});
     }
     user.password = createHash(form.newPassword);
     await usersService.update(user._id, user);
     return res.render("login", {message:"Contraseña restaurada"})
    } catch (error) {
     res.render("changePassword", {error:error.message});
    }
 });


export {router as sessionsRouter};