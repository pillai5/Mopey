const express = require('express');
const app = express();
const users = require('./routers/user')
const login = require('./routers/login')
const home = require('./routers/home');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth');
const path = require('path');
mongoose.connect('mongodb://localhost/mopey')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB'));



app.use( express.static(__dirname + '/public' ));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine','ejs');
//app.engine('html', require('ejs').renderFile);
//app.use('/:userID', users);
//app.use('/login', login);
//app.use('/', home);
app.use('/auth/google', auth);
//auth(passport);


app.get('/', (req,res)=> {
    res.json({
        status: 'session cookie not set'
    });
})

app.get('/login', (req,res)=> {

     res.sendFile(path.join(__dirname, './public','login.html'))
})


//const schema = new mongoose.Scheme({})
//
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

