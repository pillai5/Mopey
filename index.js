const express = require('express');
const app = express();
const parser = require('body-parser');
//const morgan = require('morgan');
const users = require('./routers/user')
const login = require('./routers/login')
const home = require('./routers/home');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth');

mongoose.connect('mongodb://localhost/mopey')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB'));


app.use(express.json());
app.use(express.urlencoded(extended = true));
app.use('/:userID', users);
app.use('/login', login);
//app.use('/', home);
auth(passport);
app.use(passport.initialize());

app.get('/', (req,res)=> {
    res.json({
        status: 'session cookie not set'
    });
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {}
);
//const schema = new mongoose.Scheme({})
//
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

