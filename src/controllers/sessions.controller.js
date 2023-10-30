import { UsersService } from "../services/user.service.js";

export class SessionsController {
    static redirectLogin = async (req, res) => {
        res.redirect("/login");
    };

    static failSignup = async(req, res) => {
        res.send("<p>No se pudo registrar al usuario, <a href='/registro'>intenta de nuevo</a></p>");
    };
 
    static renderProfile = async (req, res) => {
        const user = req.user;
        console.log("user", user);
        res.render("profile", { user });
    };

    static failLogin = async (req, res) => {
        res.send("<p>No se pudo loguear al usuario, <a href='/login'>intenta de nuevo</a></p>");
    };

    static forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await UsersService.getUserByEmail(email);
            if (!user) {
                res.json({ status: "error", message: "No es posible restablecer la contraseña" });
            }
            const token = generateEmailToken(email, 60 * 60);
            await recoveryEmail(req, email, token);
            res.send("Correo enviado, volver a home");
        } catch (error) {
            res.json({ status: "error", message: "No es posible restablecer la contraseña" })
        }
    };

    static resetPassword = async (req, res) => {
        try {
            const token = req.query.token;
            const { newPassword } = req.body;
            const validEmail = validateToken(token);
            if (validEmail) { //token correcto
                const user = await UsersService.getUserByEmail(validEmail);
                if (user) {
                    user.password = createHash(newPassword);
                    await UsersService.updateUser(user._id,user);
                    res.send("Contraseña actualizada <a href='/login'>Ir a Login</a>")
                }
            } else {
                return res.send("El token ya caduco, volver a intentarlo <a href='/forgot-password'></a>");
            }
        } catch (error) {
            res.send("No se pudo restablecer la contraseña, volver a intentarlo <a href='forgot-password'></a>")
        }
    };

    static modifyRole = async (req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const userRole = user.role;
            if (userRole === "user") {
                user.role = "premium";
            } else if(userRole === "premium"){
                user.role = "user"
            } else{
                res.json({status:"error", message:"No se puede cambiar el rol de este usuario"});
            };
            await UsersService.updateUser(user._id,user);
            res.json({status:"success", message:`El nuevo rol del usuario es ${user.role}`});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }

};