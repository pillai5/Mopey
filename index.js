const express = require('express');
const app = express();
const parser = require('body-parser');
//const morgan = require('morgan');
const users = require('./routers/user')
const login = require('./routers/login')
const home = require('./routers/home');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mopey')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB'));


app.use(express.json());
app.use(express.urlencoded(extended = true));
app.use('/:userID', users);
app.use('/login', login);
app.use('/', home);


//const schema = new mongoose.Scheme({})
//
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

