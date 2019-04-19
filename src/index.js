const express = require('express');
const app = express();
const users = require('./routers/user')
const login = require('./routers/login')
const home = require('./routers/home');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth');
const path = require('path');
//const session = require('express-session');



/*const sessionConfig = {
        resave: false,
        saveUninitialized: false,
        secret: '9yQcV5YyVhO9GBN9S1ZNe4G-',
        signed: true,
        store: new DatastoreStore({
          dataset: new Datastore({kind: 'express-sessions'}),
        }),
};

app.use(session(sessionConfig));*/
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
app.use('/home', home);

app.use('/login', login);

app.get('/logout', (req,res) => {
    res.redirect('./auth/google/logout');
});
app.get('/', (req,res)=> {
    console.log('currently the user is ' + auth.username);
    const homepage = './home'
    if (auth.username)  {
        res.redirect('./home');
    }
    else {
        res.redirect('./login');
    }
    //res.redirect('./routers/home');
})





//const schema = new mongoose.Scheme({})
//
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

