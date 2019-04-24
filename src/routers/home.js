const express = require('express');
const router = express.Router();
const auth = require('../auth');
const mongoose = require('mongoose');
const db = mongoose.connection;
const userCollection = db.collection('users');
const path = require('path');
var User = require('../models/Users.js');
var Promise = require('promise');
var check;
mongoose.connect('mongodb://sruthip:mopeypass1@ds133166.mlab.com:33166/mopey')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

router.use(express.static(__dirname + '/public'));

function checkIfUserExists(userid, callback) {
        User.find({ userId: userid }, function(err,user) {
        if (err) {
            throw err;
        }
        if (user.length===0) {           
            callback(0);
        }
        if (user.length > 0) {
            callback(1); 
        }
    });
};
function getCheck(check) {
    return check;
}

function createUser() {
    console.log('.userid: ' + auth.userid);
    console.log('.name: ' + auth.displayName);
    const newUser = new User({
        userId: auth.userid,
        displayName: auth.displayName,

    });
    const yeet = checkIfUserExists(auth.userid, function(check) {
        console.log('check:' + check);
        if (check===1) {
            console.log('this user already exists');
        }
        if (check===0) {
            //console.log('adding to database');
            newUser.save((err, user) => {
                if (err) return console.error(err);
            });
    
        }
    })
}

router.get('/', (req, res) => {
    //console.log('home: ' + path.join(__dirname, '../public','MainPage.html'));
    res.sendFile(path.join(__dirname, '../public', 'homepage.html'))
    console.log('Username: ' + auth.username);
    console.log('Userid: ' + auth.userid);
    createUser();
})

router.get('/all',(req, res) => {
    //console.log('home: ' + path.join(__dirname, '../public','MainPage.html'));
    User.find({},function(err, users) {
        if (err) throw err;
        res.json(users);
    });
})




module.exports = router;