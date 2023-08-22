import { Router } from "express";
import { usersService } from "../dao/index.js";
import { usersModel } from "../dao/models/users.model.js";

const router = Router();

//localhost:8080/api/sessions/signup
router.post("/signup", async (req,res)=>{
    try {
        const signupForm = req.body;
        const user = await usersService.getByEmail(signupForm.email);
        if(user){
            return res.render("signup", {error:"El usuario ya estar registrado"});
        }
        const result = await usersService.save(signupForm);
        res.render("login", {message:"usuario registrado"});
        // res.redirect("/login");
    } catch (error) {
        res.render("signup", {error:error.message})
    }
});

//localhost:8080/api/sessions/login
router.post("/login",async (req,res)=>{
    try {
        const loginForm = req.body;
        const user = await usersService.getByEmail(loginForm.email);
        // const userAdmin={
        //     email: loginForm.email,
        //     role: loginForm.role
        // };
        if(!user){
            return res.render("login", {error:"El usuario no se ha registrado"});
        }
        if(user.password === loginForm.password){ 
            req.session.userInfo = {first_name:user.first_name, email:user.email};
            res.render("profile",{
                first_name:loginForm.first_name,
                last_name:loginForm.last_name,
                age:loginForm.age,
                email:loginForm.email,
                isAdmin:loginForm.role === "admin" ? true : false, 
            })
            // res.redirect("/profile");
        }else{
            return res.render("login", {error:"Credenciales invalidas"});
        }
    } catch (error) {
        res.render("signup", {error:error.message})
    }
});

//localhost:8080/api/sessions/logout
router.post("/logout",(req,res)=>{
    res.redirect("/login");
});



export {router as sessionsRouter};