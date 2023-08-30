export const config = {
    server:{
        port:8080,
        secretSession:"claveSecretaSessions"
    },
    mongo:{
        url:"mongodb+srv://patomoretti:patito123@morettiback.ylwrggz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    gitHub:{
        clientId: "Iv1.e111e5bac9f3579b",
        clientSecret: "81cde2f13665c7902d176cc675a2a3b445e05138",
        callbackUrl: "http://localhost:8080/api/sessions/github-callback"
    }
}