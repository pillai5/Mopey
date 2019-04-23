const express = require('express');
const app = express();
const users = require('./routers/user')
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



function createEntry(currdate, currentry) {
    console.log('.userid: ' + auth.userid);
    console.log('.date ' + currdate);
    console.log('.entry: ' + currentry);
    const newJournal= new Journal({
    userId: auth.userid,
    date: currdate,
    entry: currentry
});

// newUser.save((err, user) => {
// if (err) return console.error(err);
// });
}

app.use( express.static(__dirname + '/public' ));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));

app.use('/auth/google', auth);
app.use('/home', home);
app.use('/login', login);



async function getDates(month) {

    var mycollection = db.collection('journals');
    dates = []
     mycollection.find({ month: { $regex : new RegExp(month, "i") } }, {date:1, _id:0}).forEach(function(err, doc) {
            if (!doc) {
                // we visited all docs in the collection
                return;
            }
            dates.push(doc.date);
            console.log(doc.date);
            //doc is a document in the collection
        });
   
};

async function getEntries(mm,dd,yyyy) {
    var mycollection = db.collection('journals');
    entry = "";
    var str = "";
    var date =  str.concat(mm +'/' + dd +'/' + yyyy);
    console.log(date);
    mycollection.find({ date: date }, {entry:1, _id:0}).forEach(function(err, doc) {
            if (!doc) {
                // we visited all docs in the collection
                return;
            }
            entry = doc.entry;
            //console.log(doc.entry);
    //         // doc is a document in the collection
        });
   
};
app.get('/logout', (req,res) => {
    res.redirect('./auth/google/logout');
});
app.get('/', (req,res)=> {
    console.log('currently the user is ' + auth.username);
    if (auth.username)  {
        res.redirect('./home');
    }
    else {
        res.redirect('./login');
    }
    //res.redirect('./routers/home');
})

app.get('/:month', (req,res) => {
    getDates(req.params.month);  
    setTimeout(function() {
        console.log('This runs after 2 seconds');
        res.render(req.params.month, { names : 'sruthi', dates:dates, entry: ""});
      }, 2000);
});

app.get('/:month/:mm/:dd/:yyyy', (req,res) => {
    getEntries(req.params.mm,req.params.dd, req.params.yyyy );  
    setTimeout(function() {
        console.log('This runs after 2 seconds');
            res.render(req.params.month, { dates:dates, entry: entry});
      }, 2000);
});
const port = process.env.PORT ||  3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

