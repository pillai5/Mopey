const express = require('express');
const router = express.Router();
const path = require('path');
/* const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


  var config = {
    apiKey: "AIzaSyCGOWtxUBSTVxDvg8pSELLdynv6MnNd3g4",
    authDomain: "mopey-njs.firebaseapp.com",
    databaseURL: "https://mopey-njs.firebaseio.com",
    projectId: "mopey-njs",
    storageBucket: "mopey-njs.appspot.com",
    messagingSenderId: "800363784822"
  };
  firebase.initializeApp(config);
*/ 

router.use( express.static(__dirname + '/public' ));

router.get('/', (req,res)=> {
  res.sendFile(path.join(__dirname, '../public','login.html'))
})

module.exports = router;