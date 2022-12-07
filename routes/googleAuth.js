const express = require('express');
let router = express();
const expressSession=require("express-session");
const MemoryStore = require('memorystore')(expressSession);
const fs=require('fs');
const ejs=require("ejs")
//const bcryptjs = require('bcryptjs');
const passport = require('passport');
const path = require('path');
//const googleAuth = require("./controllers/googleAuth");



require('../controllers/googleAuth')(passport);
require('../controllers/passportLocal')(passport);


router.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

router.use(passport.initialize());
router.use(passport.session());









router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

router.use('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    console.log("google call back----------->");

    console.log("session--->",req.session,req.body)
    const user=req.session.passport.user;
    console.log("user---",user)
    const id=user.id;
    const email=user.emails[0].value;
    const imglink=user.photos[0].value;
//  res.redirect('https://www.google.com');
let conpath=path.join(__dirname,'..','views','conform.ejs')
const send=fs.readFileSync(conpath,'utf8');
console.log("ejs template",send);
const sendingitem=ejs.render(send,{name:"nihgjsjhc",email:email,link:imglink})
console.log("im amama",sendingitem)
res.send(sendingitem);
   
});



//router.use(userRoutes);

module.exports = router;