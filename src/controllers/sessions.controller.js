

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

};