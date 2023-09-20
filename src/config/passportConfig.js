import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { usersDao } from "../dao/index.js";
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
                const { first_name } = req.body;
                const user = await usersDao.getByEmail(signupForm.email);
                if (user) {
                    return done(null, false)
                }
                const newUser = {
                    first_name: first_name,
                    email: username,
                    password: createHash(password)
                };
                const userCreated = await usersDao.save(newUser);
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
                const user = await usersDao.getByEmail(username);
                if(!user){
                    return done(null,false)
                }
                if(isValidPassword(user, password)){
                    return done(null, user );
                }else{
                    return done(null,false)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));


    //serializacion y deserializacion

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersDao.getById(id);
        done(null, user)
    })



    //GITHUB LOGIN!
    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.gitHub.clientId,
            clienteSecret: config.gitHub.clientSecret,
            callbackUrl: config.gitHub.callbackUrl
        },
        async(accesstoken,refreshToken,profile,done)=>{
            try {
                console.log("profile", profile);
                const user = await usersDao.getByEmail(profile.username);
                if(!user){
                    const newUser = {
                        first_name: '',
                        email: username,
                        password: createHash(password) 
                    };
                    const userCreated = await usersDao.save(newUser);
                    return done(null,userCreated)
                } else{
                    return done(null, user)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));
};