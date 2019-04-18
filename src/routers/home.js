const express = require('express');
const router = express.Router();
const auth = require('../auth');
const mongoose = require('mongoose');
const db = mongoose.connection;
const userCollection = db.collection('users');
const path = require('path');

//mongoose.connect('mongodb://localhost/mopey')
router.use( express.static(__dirname + '/public' ));

router.get('/', (req, res) => {
    console.log('home: ' + path.join(__dirname, '../public','MainPage.html'));
    res.sendFile(path.join(__dirname, '../public','MainPage.html'))
    //res.write('Username: ' + auth.username);
    //res.write('\nUserid: ' + auth.userid);
    console.log('printing home page');
    //res.end();
})

const userSchema = new mongoose.Schema({
    userId: Number,
    name: {
        firstName: String,
        lastName: String,
    }
});


const User = mongoose.model('User', userSchema);

function checkIfUserExists(userid) {
    if (userCollection.find({ userId: { $exists: true, $eq: userid } })) {
        return true;
    }
    return false;
}

async function createUser() {
    const user = new User({
        userId: auth.userId,
        name: {
            firstName: auth.firstName,
            lastName: auth.lastName
        }
    });
    console.log('HELLO I A MHERE');
    if (checkIfUserExists) {
        console.log('this user alreayd exists');
    }
    else {
        console.log('adding to database');
        const result = await user.save();
        console.log(result);
    }
}

//createUser();






module.exports = router;