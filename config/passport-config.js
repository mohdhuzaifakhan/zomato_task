// ./config/passport-config.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = mongoose.model('User')
// const bcrypt = require('bcrypt')

const authenticateUser = async (username, password, done) => {
    User.findOne({ username: username }).then((user) => {
        // console.log(user,password)
        // console.log(password === user.password)
        if (!user)
            return done(null, false, { message: 'No user with that username' })
        if(password === user.password)
            return done(null, user)
        else
            return done(null, false,{ message: 'wrong password' });
    }).catch((err) => {
        done(err);
    });
}

const strategy  = new LocalStrategy(authenticateUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
    // console.log("serialize")
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    // console.log("deserialize")
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
