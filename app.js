const express = require('express')
const app = express()
var passport = require('passport');
const User = require('./model')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/my";
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: '682168446427-evd9udh223kusr7suj3dee4mohmhj3e3.apps.googleusercontent.com',
    clientSecret: 'okxrI1lB0tCdwTyAy1nH3Orv',
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.create({ profile: profile.displayName }, function (err, user) {
            return done(err, user);
        });
    }
));


passport.use(new FacebookStrategy({
    clientID: '2451556431782339',
    clientSecret: 'b29fdc850c8eea189da22e3a23e2fed6',
    callbackURL: "localhost:3000/auth/facebook/callback",
},
    function (accessToken, refreshToken, profile, cb) {
        console.log("TOKEN", token);
        console.log("TOKEN", token);
        // asynchronous
        process.nextTick(function () {
            console.log("TOKEN", token);
            console.log("ID", profile.id);
            return done(null, profile);

        });
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['https://www.googleapis.com/auth/plus.login',
                , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: console.log('faild')
    }),
    function (req, res) {
        res.send('sucess');
    });


app.use("/api", require("./router/login"));

app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Route Not Found");
    next(error);
});

app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    });
});

app.listen(3000, function () {
    console.log("server is run");
});