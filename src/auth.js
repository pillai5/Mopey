const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const router = express.Router();
const passport = require('passport');
var userid;
var username;
var displayName;
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: '861693328919-d85bbtdgm0vmu0gn5ubdubm24480qd69.apps.googleusercontent.com',
    clientSecret: '9yQcV5YyVhO9GBN9S1ZNe4G-',
//  callbackURL: 'http://localhost:3000/auth/google/callback'
    callbackURL: 'https://mopey.herokuapp.com/auth/google/callback'

},
(token, refreshToken, profile, done) => {
    //console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user with id:', profile.id);
    //console.log('Our user is named: ', profile.firstName);
    userid = profile.id;
    username = profile.displayName;
    displayName = profile.displayName;
    return done(null, {
        profile: profile,
        token: token
    });
}));

passport.serializeUser((user, done) => {
        done(null, user);
});
passport.deserializeUser((user, done) => {
        done(null, user);
});

function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You need to login to use this service..');
    }
}

router.get('/',
    passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
    console.log('wooo we authenticated, here is our user object:',);
    //console.log('userid is ' + userid);
    module.exports.username = username;
    module.exports.userid = userid;
    module.exports.displayName = displayName;
    res.redirect('/');
});

router.get('/logout', (req,res)=> {
    console.log('user who is logging out: '+ userid);
    if (!userid) {
        res.send('You cannot sign out if you are not logged in');
    }
    else {
        userid = null;
        username = null;
        module.exports.username = username;
        module.exports.userid = userid;
        req.logout();
        res.redirect('/login');

    }
})


module.exports = router;

//https://medium.freecodecamp.org/a-quick-introduction-to-oauth-using-passport-js-65ea5b621a