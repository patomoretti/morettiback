import { Router } from "express";
import { usersDao } from "../dao/index.js";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();


//localhost:8080/signup
router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), SessionsController.redirectLogin);

// localhost:8080/fail-signup
router.get("/fail-signup", SessionsController.failSignup);

//localhost:8080/login 
router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-login"
}), SessionsController.renderProfile);

// localhost:8080/fail-login
router.get("/fail-login", SessionsController.failLogin);



//localhost:8080/api/sessions/logout
router.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) return res.render("profile", { user: req.session.userInfo, error: "No se pudo cerrar la sesion" });
        res.redirect("/");
    })
});


//localhost:8080/api/sessions/changePass  
router.post("/changePass", async (req, res) => {
    try {
        const form = req.body;
        const user = await usersDao.getByEmail(form.email);
        if (!user) {
            return res.render("changePassword", { error: "No es posible cambiar la contraseña" });
        }
        user.password = createHash(form.newPassword);
        await usersDao.update(user._id, user);
        return res.render("login", { message: "Contraseña restaurada" })
    } catch (error) {
        res.render("changePassword", { error: error.message });
    }
});



//AUTENTICANDO PASSPORT con github
// localhost:8080/api/sessions/loginGithub
router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

// localhost:8080/api/sessions/github-callback
router.get("/github-callback", passport.authenticate("githubLoginStrategy", {
    failureRedirect: "api/sessions/fail-signup"
}), (req, res) => {
    res.redirect("/perfil");
    // res.render("login", {message:"usuario registrado"});
});


export { router as sessionsRouter };