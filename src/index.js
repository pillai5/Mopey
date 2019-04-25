const express = require('express');
const app = express();
const login = require('./routers/login')
const home = require('./routers/home');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth');
const path = require('path');
var Promise = require('promise');

var mongojs = require('mongojs');
var db = mongojs('mongodb://sruthip:mopeypass1@ds133166.mlab.com:33166/mopey');
var entries;
var entry;
var Journal = require('./models/Journals.js');
mongoose.connect('mongodb://sruthip:mopeypass1@ds133166.mlab.com:33166/mopey')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use('/auth/google', auth);
app.use('/home', home);
app.use('/login', login);
var checker = "";
var found = 0;
function checkIfDateExists(check, callback) {
    var mycollection = db.collection('journals');
    mycollection.find({ id: auth.userid }, { date: 1, _id: 0, id: 1 }).forEach(function (err, doc) {
        if (!doc) {
            // we visited all docs in the collection
            return;
        }
        console.log(doc.date)
        if (doc.date === check) {
            console.log("EQUAL");
            found = 1;
            return;
        }
    });

};

async function getDates(month) {
    //console.log(month);
    //console.log('current dates: ' + dates);
    var mycollection = db.collection('journals');
    dates = []
    // console.log(auth.userid);
    mycollection.find({ month: { $regex: new RegExp(month, "i") }, id: auth.userid }, { date: 1, _id: 0, id: 1 }).forEach(function (err, doc) {
        if (!doc) {
            // we visited all docs in the collection
            return;
        }
        dates.push(doc.date);
        console.log("pushing: " + doc.date);
        // console.log(doc.id);
        //doc is a document in the collection
    });
};

async function getEntries(mm, dd, yyyy) {
    var mycollection = db.collection('journals');
    entry = "";
    var str = "";
    var date = str.concat(mm + '/' + dd + '/' + yyyy);
    //console.log(date);
    mycollection.find({ date: date, id: auth.userid }, { entry: 1, _id: 0 }).forEach(function (err, doc) {
        if (!doc) {
            // we visited all docs in the collection
            return;
        }
        entry = doc.entry;
        //console.log("rgegre" + entry);
    });

};
app.get('/logout', (req, res) => {
    res.redirect('./auth/google/logout');
});
app.get('/', (req, res) => {
    console.log('currently the user is ' + auth.username);
    if (auth.username) {
        res.redirect('./home');
    }
    else {
        res.redirect('./login');
    }
    //res.redirect('./routers/home');
})

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:month', (req, res) => {
    console.log('month right now is: ' + req.params.month);
    console.log('redirected');
    if (!auth.username) {
        res.redirect('./login');
    }
    else {
        dates = [];
        getDates(req.params.month);

        month = req.params.month;
        month = month.charAt(0).toUpperCase() + month.slice(1);
        //console.log(month);
        setTimeout(function () {
            console.log('This runs after getting dates seconds');
            console.log("MONTH RIGHT NOW: " + month);
            res.render('generic', { month: month, name: auth.displayName, dates: dates, entry: "" });
        }, 1000);
    }
});

app.get('/:month/:mm/:dd/:yyyy', (req, res) => {
    if (!auth.username) {
        res.redirect('./login');
    }
    else {

        getEntries(req.params.mm, req.params.dd, req.params.yyyy);
        console.log(req.params.mm);
        console.log(req.params.dd);
        console.log(req.params.yyyy);

        setTimeout(function () {
            //console.log("test: " + entry);
            console.log('This runs after 1 seconds');
            res.render('generic', { month: month, dates: dates, name: auth.displayName, entry: entry });
        }, 1000);
    }
});



app.post('/addentry', (req, res) => {
    if (!auth.username) {
        res.redirect('./login');
    }
    else {
        console.log(req.body.date);
        console.log(req.body.month);
        console.log(req.body.entry);
        console.log(auth.userid);
        const newJournal = new Journal({
            id: auth.userid,
            month: req.body.month,
            date: req.body.date,
            entry: req.body.entry
        });
        found = 0;
        //getDates(req.params.month);

        checkIfDateExists(req.body.date);
        setTimeout(function () {
            console.log('check:' + found);
            if (found === 1) {
                console.log('this date already exists');
            }
            else if (found === 0) {
                console.log('adding to db')
                newJournal.save((err, journal) => {
                    if (err) return console.error(err);
                });
            }
        }, 2000);
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

