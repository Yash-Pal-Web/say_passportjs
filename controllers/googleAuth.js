var GoogleStrategy = require('passport-google-oauth20').Strategy;
//let User = require("../models").User;
const clientId = require('../config/googleData').clientId;
const clientSecreT = require('../config/googleData').clientSecret;

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: clientId,
        clientSecret: clientSecreT,
        callbackURL: "http://localhost:5000/googleauth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        
          return done(null,profile)
        console.log("passport imagess found  ----- ------")
    }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
       done(null,id)
    });

}