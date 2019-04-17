const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(passport.initialize());

passport.serializeUser((user, done) => {
        done(null, user);
});
passport.deserializeUser((user, done) => {
        done(null, user);
});
passport.use(new GoogleStrategy({
            clientID: '861693328919-d85bbtdgm0vmu0gn5ubdubm24480qd69.apps.googleusercontent.com',
            clientSecret: '9yQcV5YyVhO9GBN9S1ZNe4G-',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
}));

router.get('/', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/home')
        //console.log('we out here')
    }
);

module.exports = router;
