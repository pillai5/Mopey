const GoogleStrategy = require('passport-google-    oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '861693328919-d85bbtdgm0vmu0gn5ubdubm24480qd69.apps.googleusercontent.com',
            clientSecret: '9yQcV5YyVhO9GBN9S1ZNe4G-',
            callbackURL: 'https://mopey.herokuapp.com/home'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};