import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { UsersService } from "../services/user.service.js";
import githubStrategy from "passport-github2";
import { config } from "./config.js";


export const initializePassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            //username,password
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                const user = await UsersService.getUserByEmail(username);
                if (user) {
                    return done(null, false)
                }
                let role = "user";
                if (username.endsWith("@coder.com")) {
                    role = "admin";
                };
                const newUser = {
                    first_name: first_name,
                    email: username,
                    password: createHash(password),
                    role: role,
                    avatar:req.file.filename
                };
                const userCreated = await UsersService.saveUser(newUser);
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email"
        }, 
        async (username, password, done) => {
            try {
                const user = await UsersService.getUserByEmail(username);
                if (!user) {
                    return done(null, false)
                }
                if (isValidPassword(user, password)) {
                    user.last_connection = new Date();
                    await UsersService.updateUser(user._id, user);
                    return done(null, user);
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("logOutStrategy", new LocalStrategy(
        {
            usernameField: "email"
        },
        async (done) => {
            try {
                req.session.destroy(error => {
                    if (error) return res.render("profile", { user: req.session.userInfo, error: "No se pudo cerrar la sesion" });
                    res.redirect("/");
                })
            } catch (error) {
                return done(error);
            }
        }
    ));


    //serializacion y deserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UsersService.getUserById(id);
        done(null, user)
    });



    //GITHUB LOGIN!
    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.gitHub.clientId,
            clienteSecret: config.gitHub.clientSecret,
            callbackUrl: config.gitHub.callbackUrl
        },
        async (accesstoken, refreshToken, profile, done) => {
            try {
                console.log("profile", profile);
                const user = await usersDao.getByEmail(profile.username);
                if (!user) {
                    const newUser = {
                        first_name: '',
                        email: username,
                        password: createHash(password)
                    };
                    const userCreated = await usersDao.save(newUser);
                    return done(null, userCreated)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
};