//let User = require("../models").User;

var localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
       done(null,id)
    });



}